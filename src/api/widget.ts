import {getWidget, getWidgetStyles} from "@/controllers/widget";
import { Router } from "express";

const router = Router();

router.get('/getWidget', getWidget);
router.post('/getWidgetStyles', getWidgetStyles);

export default router;
