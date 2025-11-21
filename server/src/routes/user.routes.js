import express from "express";
import authMiddleWare from "../middleware/auth.js";
import {
  createUser,
  login,
  updateProfile,
  signOut,
  getUser,
  getUserByUsername,
} from "../controllers/user.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/sign-up", createUser);

router.post("/login", login);

router.post("/sign-out", signOut);

router.get("/", authMiddleWare, getUser);

router.get("/:username", authMiddleWare, getUserByUsername);

router.post("/profile", authMiddleWare, upload.single("image"), updateProfile);

export default router;
