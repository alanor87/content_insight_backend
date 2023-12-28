import Stripe from "stripe";
import { Response, NextFunction } from "express";
import { RequestUserIdType } from "@/types/common";
import dotenv from "dotenv";
dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY_TEST || "");

async function getPaymentSessionStatus(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { session_id } = req.body;

    // Getting the session object from Stripe by the session_id, provided from the frontend success page.
    // Relying on this data as for the successful payment for the subscription.
    // But this same info goes to the database from the webhook call on checkout.session.completed event.
    // It should return all the same data, so I think it is safe to inform client of it this way, since I dont want to create
    // mechanism to inform the client of the webhook events. So will be this way, fingers crossed)
    const session = await stripeInstance.checkout.sessions.retrieve(session_id);

    res.send({
      status: session.status,
      lastPaid: session.created,
      stripeCustomerId: session.customer,
      stripeProjectSubscriptionId: session.subscription,
    });
  } catch (error: any) {
    error.message = "Error getting payment session data. \n" + error.message;
    next(error);
  }
}

export default getPaymentSessionStatus;
