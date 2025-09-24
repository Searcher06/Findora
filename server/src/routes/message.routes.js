import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { getUsersToChat } from "../controllers/message.controller.js";
const router = express.Router();

// Get's all the users the current user can send message to
router.get("/users", authMiddleWare, getUsersToChat);
export default router;
