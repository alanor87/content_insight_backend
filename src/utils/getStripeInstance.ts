import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

/** Getting instance of Stripe api interface for the proper (dev or prod) environment. */
function getStripeInstance() {
  const {
    NODE_ENV,
    STRIPE_SECRET_KEY_TEST = "",
    STRIPE_SECRET_KEY_PROD = "",
  } = process.env;

  return new Stripe(
    NODE_ENV === "production" ? STRIPE_SECRET_KEY_PROD : STRIPE_SECRET_KEY_TEST
  );
}

export default getStripeInstance;
