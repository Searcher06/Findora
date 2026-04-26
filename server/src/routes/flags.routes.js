import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { createFlag, getMyFlags } from "../controllers/flag.controller.js";

const router = express.Router();

router.post("/", authMiddleWare, createFlag);
router.get("/mine", authMiddleWare, getMyFlags);

export default router;
