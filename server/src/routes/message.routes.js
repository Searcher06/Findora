import express from "express";

const router = express.Router();

// get's all the user's the logged in user can send message to
router.get("/");
export default router;
