import express from "express";
import authMiddleWare from "../middleware/auth.js";
import adminOnlyMiddleware from "../middleware/admin.js";
import {
  getDashboardOverview,
  getBasicAnalytics,
  getUsersForAdmin,
  suspendUser,
  reactivateUser,
  getItemsForModeration,
  hideItem,
  unhideItem,
  deleteItemByAdmin,
  getRequestsForAdmin,
  forceCloseRequest,
  getFlagsQueue,
  reviewFlag,
  getAuditLogs,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(authMiddleWare, adminOnlyMiddleware);

router.get("/overview", getDashboardOverview);
router.get("/analytics", getBasicAnalytics);

router.get("/users", getUsersForAdmin);
router.patch("/users/:userId/suspend", suspendUser);
router.patch("/users/:userId/reactivate", reactivateUser);

router.get("/items", getItemsForModeration);
router.patch("/items/:itemId/hide", hideItem);
router.patch("/items/:itemId/unhide", unhideItem);
router.delete("/items/:itemId", deleteItemByAdmin);

router.get("/requests", getRequestsForAdmin);
router.patch("/requests/:requestId/force-close", forceCloseRequest);

router.get("/flags", getFlagsQueue);
router.patch("/flags/:flagId", reviewFlag);

router.get("/audit-logs", getAuditLogs);

export default router;
