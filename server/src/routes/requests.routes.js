import express from "express";
import authMiddleWare from "../middleware/auth.js";
import {
  claimItem,
  reportItemFound,
  getAllRequests,
  verifyHandover,
  getRequestsById,
  acceptClaim,
} from "../controllers/request.controller.js";
import {
  validateRequestAccess,
  validateAcceptClaim,
} from "../middleware/request.js";
import { notOwnerShipMiddleware } from "../middleware/itemOwnership.js";

const router = express.Router();

// Get all users requests
router.get("/", authMiddleWare, getAllRequests);

// Get request by id
router.get(
  "/:requestId",
  authMiddleWare,
  validateRequestAccess,
  getRequestsById
);

// sends a claim request with item id
router.post("/claim/:id", authMiddleWare, notOwnerShipMiddleware, claimItem);

// sends a found request with item id
// prettier-ignore
router.post("/found/:id",authMiddleWare,notOwnerShipMiddleware,reportItemFound);

// prettier-ignore
router.post("/accept/:requestId",authMiddleWare,validateRequestAccess,validateAcceptClaim,acceptClaim)

// Verify handover codes between finder and claimer
router.post("/verify/:requestId", authMiddleWare, verifyHandover);
export default router;
