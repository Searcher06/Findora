import express from "express";
import authMiddleWare from "../middleware/auth.js";
import {
  getAllMessages,
  getUsersToChat,
  sendMessage,
} from "../controllers/message.controller.js";
import { chatMiddleware } from "../middleware/chat.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// Get's all the users the current user can send message to
router.get("/users", authMiddleWare, getUsersToChat);

router
  .route("/:requestId/:username")
  .post(authMiddleWare, upload.single("image"), chatMiddleware, sendMessage) // send message
  .get(authMiddleWare, chatMiddleware, getAllMessages); // get messages

export default router;
