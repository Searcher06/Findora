import express from "express";
import authMiddleWare from "../middleware/auth.js";
import {
  getUsersToChat,
  sendMessage,
} from "../controllers/message.controller.js";
import { chatMiddleware } from "../middleware/chat.js";
const router = express.Router();

// Get's all the users the current user can send message to
router.get("/users", authMiddleWare, getUsersToChat);

// send message
router.post("/:username", authMiddleWare, chatMiddleware, sendMessage);

export default router;
