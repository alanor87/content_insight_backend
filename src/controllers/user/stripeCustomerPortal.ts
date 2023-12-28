import Stripe from "stripe";
import { RequestUserIdType } from "@/types/common";
import { NextFunction, Response } from "express";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY_TEST || "");

async function stripeCustomerPortal(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    const returnUrl = req.get('Origin') + "/cabinet/projects";
    const { userStripeCustomerId } = req.body;

    const portalSession = await stripeInstance.billingPortal.sessions.create({
      customer: userStripeCustomerId,
      return_url: returnUrl,
    });

    // Sending the customer portal link to the client.
    res.status(200).json({portal_session_url : portalSession.url});
  } catch (error: any) {
    const originalErrorMessage = error.message;
    error.message =
      `Error creating stripe customer portal. \n ` + originalErrorMessage;
    next(error);
  }
}
export default stripeCustomerPortal;
