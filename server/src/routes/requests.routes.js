import express from "express";
import authMiddleWare from "../middleware/auth.js";
import {
  claimItem,
  sendFoundRequest,
  getAllRequests,
  handleItem,
  getRequestsById,
  acceptClaim,
} from "../controllers/request.controller.js";
import {
  basicRequestMiddleware,
  requestDecisionMiddleware,
} from "../middleware/request.js";
import {
  notOwnerShipMiddleware,
  ownerShipMiddleware,
} from "../middleware/itemOwnership.js";

const router = express.Router();

// Get all users requests
router.get("/", authMiddleWare, getAllRequests);

// Get request by id
router.get(
  "/:requestId",
  authMiddleWare,
  basicRequestMiddleware,
  getRequestsById
);

// sends a claim request with item id
router.post("/claim/:id", authMiddleWare, notOwnerShipMiddleware, claimItem);

// sends a found request with item id
// prettier-ignore
router.post("/found/:id",authMiddleWare,notOwnerShipMiddleware,sendFoundRequest);

// prettier-ignore
router.post("/accept/:requestId",authMiddleWare,basicRequestMiddleware,requestDecisionMiddleware,acceptClaim)

// Item handling
router.post("/handle/:requestId", authMiddleWare, handleItem);
export default router;
