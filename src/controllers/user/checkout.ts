import Stripe from "stripe";
import { RequestUserIdType } from "@/types/common";
import { NextFunction, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY_TEST || "");

async function checkout(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price: "price_1NzOY1EafHQOYw4BBaUC7E4Q",
          quantity: 1,
        },
      ],
      mode: "subscription",
      ui_mode: "embedded",
      return_url: "http://localhost:3000/cabinet/billing/checkoutResult?session_id={CHECKOUT_SESSION_ID}",
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error: any) {
    error.message = "Error creating payment subscription. \n" + error.message;
    next(error);
  }
}

export default checkout;
