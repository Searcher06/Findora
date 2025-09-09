import express from "express";
import authMiddleWare from "../middleware/auth.js";
import {
  createUser,
  login,
  updateProfile,
  signOut,
  getUser,
  getUserByUsername,
  userProfile,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/sign-up", createUser);

router.post("/login", login);

router.post("/sign-out", signOut);

router.get("/", authMiddleWare, getUser);

router.get("/:username", authMiddleWare, getUserByUsername);

router
  .route("/profile")
  .get(authMiddleWare, userProfile)
  .post(authMiddleWare, updateProfile);

export default router;
