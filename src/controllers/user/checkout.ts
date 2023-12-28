import Stripe from "stripe";
import { RequestUserIdType } from "@/types/common";
import { NextFunction, Response } from "express";
import dotenv from "dotenv";
import { User } from "@/models";
dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY_TEST || "");

async function checkout(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId as string;
    const { projectId, projectName } = req.body;

    const user = await User.findById(userId);

    // The metadata contains the user and project id - and it is passed with the checkout event
    // to the webhook call. Then we can figure out what user paid for what project subscription.*/

    const stripeSessionOptions: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price: "price_1NzOY1EafHQOYw4BBaUC7E4Q",
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        projectId,
        projectName
      },
      mode: "subscription",
      ui_mode: "embedded",
      // Adding the projectId to the URL, so to figure out on the frontend which project this payment session was for,
      // since all the app is being reload there due to redirect.
      return_url: `${req.headers.origin}/cabinet/billing/checkoutResult?session_id={CHECKOUT_SESSION_ID}&projectId=${projectId}`,
    };

    // If the customer was already registered in Stripe.
    if (user?.userStripeCustomerId)
      stripeSessionOptions.customer = user?.userStripeCustomerId;

    const session = await stripeInstance.checkout.sessions.create(stripeSessionOptions);

    res.send({ clientSecret: session.client_secret });
  } catch (error: any) {
    error.message = "Error creating payment subscription. \n" + error.message;
    next(error);
  }
}

export default checkout;
