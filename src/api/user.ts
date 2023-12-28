import { Router } from "express";
import { getUserByToken, checkout, getPaymentSessionStatus, logout, stripeCustomerPortal } from "@/controllers/user";

const router = Router();

router.use("/getUserByToken", getUserByToken);
router.use("/checkout", checkout);
router.use("/getPaymentSessionStatus", getPaymentSessionStatus);
router.use("/customerPortal", stripeCustomerPortal);
router.use("/logout", logout);

export default router;
