import express from "express";
import authMiddleWare from "../middleware/auth.js";
import {
  getUsersToChat,
  sendMessage,
  getAllMessages,
  markAsRead,
} from "../controllers/message.controller.js";
import { chatMiddleware } from "../middleware/chat.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Get all the conversations for the inbox
router.get("/users", authMiddleWare, getUsersToChat);

// Mark messages as read (clears notification badge)
router.patch("/read/:requestId", authMiddleWare, markAsRead);

router
  .route("/:requestId/:username")
  .post(authMiddleWare, upload.single("image"), chatMiddleware, sendMessage) // send message
  .get(authMiddleWare, chatMiddleware, getAllMessages); // get messages

export default router;
