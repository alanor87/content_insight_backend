import { Router } from "express";
import {getUserByToken, logout} from '@/controllers/user'

const router = Router();

router.use('/getUserByToken', getUserByToken);
router.use('/logout', logout);

export default router;