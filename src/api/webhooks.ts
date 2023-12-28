import { stripe } from "@/controllers/webhooks";
import { Router } from "express";

const router = Router();

router.use("/stripe", stripe);

export default router;