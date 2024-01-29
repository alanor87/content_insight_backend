import { Request, Response } from "express";
import { Project, User } from "@/models";
import {
  deleteProjectSubscriptionData,
  getUser,
  getStripeInstance,
} from "@/utils";
import dotenv from "dotenv";
dotenv.config();

const stripeInstance = getStripeInstance();

const { NODE_ENV, STRIPE_WEBHOOK_KEY_PROD, STRIPE_WEBHOOK_KEY_TEST } =
  process.env;

const endpointSecret =
  NODE_ENV === "production" ? STRIPE_WEBHOOK_KEY_PROD : STRIPE_WEBHOOK_KEY_TEST;

// Bounding the stripe mode to the deployment mode. So when the client \ project is being created from
// dev environment - it will be test mode in stripe, and the operations with Stripe for him will be only
// available from there, the same for the prod/live mode.
const stripeMode = NODE_ENV === "production" ? "live" : "test";

/** Stripe events listener webhook. */
async function stripe(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] || "";

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret || ""
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
        const {
          metadata,
          customer,
          customer_details,
          created,
          subscription,
        } = event.data.object;
        const userId = metadata?.userId as string;
        const projectId = metadata?.projectId as string;
        const projectName = metadata?.projectName as string;

        // Adding this metadata to the subscription, so we would know which project this subscription is for.
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

        const project = await Project.findById(projectId);

        // If this user subscribes for the first time - adding his stripe customer id and email to the DB.
        if (!user?.userStripeCustomerId) {
          await User.findByIdAndUpdate(userId, {
            userStripeCustomerId: customer,
            userStripeCustomerEmail: customer_details?.email,
            stripeMode,
          });

          // So the project is bounded to the stripe mode that user was created in.
          project!.subscription!.stripeMode = stripeMode;
        }

        // Since the subscription is successfully created - making the project subscription active.
        project!.subscription = {
          ...project!.subscription,
          id: subscription as string,
          isActive: true,
          lastPaid: created * 1000, // Stripe gives dates in the unix timestamp, need to  * 1000.
        };

        await project?.save();
        break;
      }

      // Subscription for the project is paid, making it active.
      case "invoice.paid": {
        const { subscription, created } = event.data.object;
        await Project.findOneAndUpdate(
          { subscription: { id: subscription } },
          {
            subscription: {
              isActive: true,
              lastPaid: created * 1000, // Stripe gives dates in the unix timestamp, need to  * 1000.
            },
          }
        );
        break;
      }

      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      case "invoice.payment_failed":
        console.log("invoice.payment_failed" + " : \n", event.data.object);
        const { subscription } = event.data.object;
        await Project.findOneAndUpdate(
          { subscription: { id: subscription } },
          {
            subscription: {
              isActive: false,
            },
          }
        );
        break;

      // Fires when the client cancells the subscription from the portal, or when he deletes the project.
      case "customer.subscription.deleted": {
        const { id } = event.data.object;
        await deleteProjectSubscriptionData(id);
        break;
      }
      default:
        break;
    }
  } catch (error: any) {
    console.log("Error on stripe webhook : ", error.message);
  } finally {
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
}

export default stripe;
