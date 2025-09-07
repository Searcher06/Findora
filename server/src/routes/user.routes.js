import express from "express";
import {
  createUser,
  login,
  updateProfile,
  signOut,
  getUser,
  getUserById,
  userProfile,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/sign-up", createUser);

router.post("/login", login);

router.post("/sign-out", signOut);

router.get("/", getUser);

router.get("/:id", getUserById);

router.route("/profile").get(userProfile).post(updateProfile);

export default router;
