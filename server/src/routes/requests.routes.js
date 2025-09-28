import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { itemOwner } from "../middleware/itemOwner.js";
import {
  claimItem,
  getAllRequests,
  setRequestAnswers,
  setRequestQuestions,
  setRequestDecision,
  handleItem,
} from "../controllers/request.controller.js";
import {
  requestDecisionMiddleware,
  setRequestVerificationMiddleware,
  setVerificationAnswersMiddleware,
} from "../middleware/request.js";

const router = express.Router();

// Get all users requests
router.get("/", authMiddleWare, getAllRequests);

// sends a claim request with item id
router.post("/claim/:id", authMiddleWare, itemOwner, claimItem);

// sends a verification questions inform of array of objects [{question:"what is the name of the item"}]
router.put(
  "/verify/setquestion/:requestId",
  authMiddleWare,
  setRequestVerificationMiddleware,
  setRequestQuestions
);

// sends verification answers inform of array objects [{questionId:12345678910,answer:"It's a yellow bag"}]
router.post(
  "/verify/setanswers/:requestId",
  authMiddleWare,
  setVerificationAnswersMiddleware,
  setRequestAnswers
);

// modifies the request with either accept or reject i.e making final decision based
// the verification answers provided by the item claimer
router.put(
  "/verify/:requestId",
  authMiddleWare,
  requestDecisionMiddleware,
  setRequestDecision
);

// Item handling
router.post("/handle/:requestId", authMiddleWare, handleItem);
export default router;
