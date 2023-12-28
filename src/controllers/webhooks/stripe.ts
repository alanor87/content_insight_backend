import { Request, Response } from "express";
import Stripe from "stripe";
import { Project, User } from "@/models";
import { deleteProjectSubscriptionData, getUser } from "@/utils";
import dotenv from "dotenv";
dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY_TEST || "");

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY_TEST || "";

/** Stripe events listener webhook. */
async function stripe(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] || "";

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // So the checkout session was success. Getting the user and project ids from the event metadata that
        // were passed on that checkout session creation.
        const { metadata, customer, customer_details, created, subscription } =
          event.data.object;
        const userId = metadata?.userId as string;
        const projectId = metadata?.projectId as string;
        const projectName = metadata?.projectName as string;

        // Adding this metadata to the subscription, so we would know which project this subscription is for
        await stripeInstance.subscriptions.update(
          event.data.object.subscription as string,
          {
            description: "Project name : " + projectName,
            metadata: {
              projectId,
              userId,
            },
          }
        );

        const user = await getUser({ _id: metadata?.userId }, false);

        // If this user subscribes for the first time - adding his stripe customer id and email to the DB.
        if (!user?.userStripeCustomerId) {
          await User.findByIdAndUpdate(userId, {
            userStripeCustomerId: customer,
            userStripeCustomerEmail: customer_details?.email,
          });
        }

        // Since the subscription is successfully created - making the project subscription active.
        await Project.findByIdAndUpdate(projectId, {
          subscription: {
            id: subscription,
            isActive: true,
            lastPaid: created * 1000, // Stripe gives dates in the unix timestamp, need to  * 1000.
          },
        });
        break;
      }
      case "invoice.paid": {
        console.log("invoice.paid" + " : \n", event.data.object);
        break;
      }

      case "invoice.payment_failed":
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        break;

      case "customer.subscription.deleted": {
        const { id } = event.data.object;
        await deleteProjectSubscriptionData(id);
        break;
      }
      default:
        break;
    }
  } catch (error: any) {
  } finally {
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
}

export default stripe;
