import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { itemOwner } from "../middleware/itemOwner.js";
import {
  claimItem,
  getAllRequests,
  setRequestQuestions,
} from "../controllers/request.controller.js";

const router = express.Router();

// Get all users requests
router.get("/", authMiddleWare, getAllRequests);

// sends a claim request with item id
router.post("/claim/:id", authMiddleWare, itemOwner, claimItem);

// sends a verification questions inform of array of objects [{question:"what is the name of the item"}]
router.post(
  "/verify/setquestion/:requestId",
  authMiddleWare,
  setRequestQuestions
);
export default router;
