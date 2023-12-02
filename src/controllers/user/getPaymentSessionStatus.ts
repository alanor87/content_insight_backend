import Stripe from "stripe";
import { Request } from "express";
import { NextFunction, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY_TEST || "");

async function getPaymentSessionStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (typeof req.body.session_id !== "string")
      throw Error("Missing or invalid session_id.");

    const session = await stripeInstance.checkout.sessions.retrieve(
      req.body.session_id
    );

    res.send({
      status: session.status,
      customer_email: session.customer_details?.email,
    });
  } catch (error: any) {
    error.message = "Error getting payment session data. \n" + error.message;
    next(error);
  }
}

export default getPaymentSessionStatus;
