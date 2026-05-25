import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { subscribe, unsubscribe, getVapidPublicKey } from "../controllers/push.controller.js";

const router = express.Router();

router.get("/vapid-public-key", getVapidPublicKey);
router.post("/subscribe", authMiddleWare, subscribe);
router.post("/unsubscribe", authMiddleWare, unsubscribe);

export default router;
