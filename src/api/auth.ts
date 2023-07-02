import { Router } from "express";
import { register, login } from "@/controllers/auth";

const router = Router();

router.use("/register", register);
router.use("/login", login);

export default router;
