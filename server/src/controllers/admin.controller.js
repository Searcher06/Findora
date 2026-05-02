import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";
import { itemModel } from "../models/item.model.js";
import { requestModel } from "../models/request.model.js";
import { adminFlagModel } from "../models/adminFlag.model.js";
import { adminAuditLogModel } from "../models/adminAuditLog.model.js";
import { logAdminAction } from "../utils/adminAudit.js";
import { deleteCloudinaryImage } from "../utils/cloudinaryImage.js";

const parsePagination = (req, defaultLimit = 20) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(parseInt(req.query.limit, 10) || defaultLimit, 1),
    100
  );
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const ensureSuperAdminAction = (req, res) => {
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Only admins can perform this action");
  }
};

const getDashboardOverview = async (req, res) => {
  const [totalUsers, activeUsers, suspendedUsers, totalItems, hiddenItems, pendingRequests, returnedItems, openFlags] =
    await Promise.all([
      userModel.countDocuments(),
      userModel.countDocuments({ isSuspended: false }),
      userModel.countDocuments({ isSuspended: true }),
      itemModel.countDocuments(),
      itemModel.countDocuments({ isHidden: true }),
      requestModel.countDocuments({ status: "pending" }),
      itemModel.countDocuments({ status: "returned" }),
      adminFlagModel.countDocuments({ status: { $in: ["open", "in_review"] } }),
    ]);

  res.status(200).json({
    users: {
      total: totalUsers,
      active: activeUsers,
      suspended: suspendedUsers,
    },
    items: {
      total: totalItems,
      hidden: hiddenItems,
    },
    requests: {
      pending: pendingRequests,
    },
    handovers: {
      returnedItems,
    },
    moderation: {
      openFlags,
    },
  });
};

const getBasicAnalytics = async (req, res) => {
  const totalRequests = await requestModel.countDocuments();
  const returnedRequests = await requestModel.countDocuments({ status: "returned" });
  const pendingRequests = await requestModel.countDocuments({ status: "pending" });
  const resolvedRequests = await requestModel.countDocuments({
    status: { $in: ["returned", "closed"] },
  });

  const returnSuccessRate =
    totalRequests === 0
      ? 0
      : Number(((returnedRequests / totalRequests) * 100).toFixed(2));

  res.status(200).json({
    requests: {
      total: totalRequests,
      pending: pendingRequests,
      resolved: resolvedRequests,
      returned: returnedRequests,
      returnSuccessRate,
    },
  });
};

const getUsersForAdmin = async (req, res) => {
  const { search, role, suspended } = req.query;
  const { page, limit, skip } = parsePagination(req);
  const query = {};

  if (role && ["student", "admin", "moderator"].includes(role)) {
    query.role = role;
  }

  if (suspended === "true") query.isSuspended = true;
  if (suspended === "false") query.isSuspended = false;

  if (search && String(search).trim()) {
    const value = String(search).trim();
    query.$or = [
      { firstName: { $regex: value, $options: "i" } },
      { lastName: { $regex: value, $options: "i" } },
      { username: { $regex: value, $options: "i" } },
      { email: { $regex: value, $options: "i" } },
    ];
  }

  const [users, total] = await Promise.all([
    userModel
      .find(query)
      .select("-password -emailVerificationToken -passwordResetToken -passwordResetExpires")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    userModel.countDocuments(query),
  ]);

  res.status(200).json({
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    },
  });
};

const suspendUser = async (req, res) => {
  ensureSuperAdminAction(req, res);
  const { userId } = req.params;
  const { reason } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  if (req.user._id.toString() === userId) {
    res.status(400);
    throw new Error("You cannot suspend your own account");
  }

  const user = await userModel.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isSuspended) {
    return res.status(200).json({ message: "User already suspended", user });
  }

  user.isSuspended = true;
  user.suspendedAt = new Date();
  user.suspensionReason = reason ? String(reason).trim() : "Suspended by admin";
  user.tokenVersion = (user.tokenVersion || 0) + 1;

  await user.save();

  await logAdminAction({
    req,
    action: "suspend_user",
    targetType: "user",
    targetId: user._id,
    details: { reason: user.suspensionReason },
  });

  res.status(200).json({ message: "User suspended successfully", user });
};

const reactivateUser = async (req, res) => {
  ensureSuperAdminAction(req, res);
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  const user = await userModel.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.isSuspended = false;
  user.suspendedAt = undefined;
  user.suspensionReason = undefined;
  user.tokenVersion = (user.tokenVersion || 0) + 1;
  await user.save();

  await logAdminAction({
    req,
    action: "reactivate_user",
    targetType: "user",
    targetId: user._id,
  });

  res.status(200).json({ message: "User reactivated successfully", user });
};

const getItemsForModeration = async (req, res) => {
  const { hidden, search, status } = req.query;
  const { page, limit, skip } = parsePagination(req);
  const query = {};

  if (hidden === "true") query.isHidden = true;
  if (hidden === "false") query.isHidden = false;

  if (status && ["lost", "found", "claimed", "returned"].includes(status)) {
    query.status = status;
  }

  if (search && String(search).trim()) {
    const value = String(search).trim();
    query.$or = [
      { name: { $regex: value, $options: "i" } },
      { location: { $regex: value, $options: "i" } },
      { description: { $regex: value, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    itemModel
      .find(query)
      .populate("reportedBy", "firstName lastName username email")
      .populate("hiddenBy", "firstName lastName username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    itemModel.countDocuments(query),
  ]);

  res.status(200).json({
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    },
  });
};

const hideItem = async (req, res) => {
  const { itemId } = req.params;
  const { reason } = req.body;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400);
    throw new Error("Invalid item ID");
  }

  const item = await itemModel.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  item.isHidden = true;
  item.hiddenBy = req.user._id;
  item.hiddenReason = reason ? String(reason).trim() : "Hidden by admin";
  await item.save();

  await logAdminAction({
    req,
    action: "hide_item",
    targetType: "item",
    targetId: item._id,
    details: { reason: item.hiddenReason },
  });

  res.status(200).json({ message: "Item hidden successfully", item });
};

const unhideItem = async (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400);
    throw new Error("Invalid item ID");
  }

  const item = await itemModel.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  item.isHidden = false;
  item.hiddenBy = undefined;
  item.hiddenReason = undefined;
  await item.save();

  await logAdminAction({
    req,
    action: "unhide_item",
    targetType: "item",
    targetId: item._id,
  });

  res.status(200).json({ message: "Item restored successfully", item });
};

const deleteItemByAdmin = async (req, res) => {
  ensureSuperAdminAction(req, res);
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400);
    throw new Error("Invalid item ID");
  }

  const item = await itemModel.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  const linkedRequestExists = await requestModel.exists({ itemId: item._id });
  if (linkedRequestExists) {
    res.status(409);
    throw new Error(
      "Item cannot be deleted because it is linked to one or more requests"
    );
  }

  if (item.image || item.imagePublicId) {
    await deleteCloudinaryImage({
      publicId: item.imagePublicId,
      imageUrl: item.image,
    });
  }

  await itemModel.findByIdAndDelete(itemId);

  await logAdminAction({
    req,
    action: "delete_item",
    targetType: "item",
    targetId: item._id,
    details: { itemName: item.name, previousStatus: item.status },
  });

  res.status(200).json({ message: "Item deleted successfully" });
};

const getRequestsForAdmin = async (req, res) => {
  const { status } = req.query;
  const { page, limit, skip } = parsePagination(req);
  const query = {};

  if (status && ["pending", "accepted", "returned", "closed"].includes(status)) {
    query.status = status;
  }

  const [requests, total] = await Promise.all([
    requestModel
      .find(query)
      .populate("itemId", "name status")
      .populate("finderId", "firstName lastName username")
      .populate("claimerId", "firstName lastName username")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit),
    requestModel.countDocuments(query),
  ]);

  res.status(200).json({
    requests,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    },
  });
};

const forceCloseRequest = async (req, res) => {
  const { requestId } = req.params;
  const { reason } = req.body;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID");
  }

  const requestDoc = await requestModel.findById(requestId).populate("itemId");
  if (!requestDoc) {
    res.status(404);
    throw new Error("Request not found");
  }

  if (requestDoc.status === "returned") {
    res.status(400);
    throw new Error("Cannot close a returned request");
  }

  requestDoc.status = "closed";
  requestDoc.closedAt = new Date();
  requestDoc.closedBy = req.user._id;
  requestDoc.closeReason = reason
    ? String(reason).trim()
    : "Force-closed by admin";

  if (requestDoc.itemId && requestDoc.itemId.status === "claimed") {
    requestDoc.itemId.status =
      requestDoc.requestType === "claim" ? "found" : "lost";
    await requestDoc.itemId.save();
  }

  await requestDoc.save();

  await logAdminAction({
    req,
    action: "force_close_request",
    targetType: "request",
    targetId: requestDoc._id,
    details: { reason: requestDoc.closeReason },
  });

  res.status(200).json({
    message: "Request force-closed successfully",
    request: requestDoc,
  });
};

const getFlagsQueue = async (req, res) => {
  const { status } = req.query;
  const { page, limit, skip } = parsePagination(req);
  const query = {};

  if (status && ["open", "in_review", "resolved", "dismissed"].includes(status)) {
    query.status = status;
  }

  const [flags, total] = await Promise.all([
    adminFlagModel
      .find(query)
      .populate("reportedBy", "firstName lastName username")
      .populate("reviewedBy", "firstName lastName username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    adminFlagModel.countDocuments(query),
  ]);

  res.status(200).json({
    flags,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    },
  });
};

const reviewFlag = async (req, res) => {
  const { flagId } = req.params;
  const { status, adminNote } = req.body;

  if (!mongoose.Types.ObjectId.isValid(flagId)) {
    res.status(400);
    throw new Error("Invalid flag ID");
  }

  if (!["in_review", "resolved", "dismissed"].includes(status)) {
    res.status(400);
    throw new Error("Invalid flag status");
  }

  const flag = await adminFlagModel.findById(flagId);
  if (!flag) {
    res.status(404);
    throw new Error("Flag not found");
  }

  flag.status = status;
  flag.reviewedBy = req.user._id;
  flag.reviewedAt = new Date();
  flag.adminNote = adminNote ? String(adminNote).trim() : flag.adminNote;
  await flag.save();

  await logAdminAction({
    req,
    action: "review_flag",
    targetType: "flag",
    targetId: flag._id,
    details: { status: flag.status },
  });

  res.status(200).json({ message: "Flag updated", flag });
};

const getAuditLogs = async (req, res) => {
  const { page, limit, skip } = parsePagination(req, 30);

  const [logs, total] = await Promise.all([
    adminAuditLogModel
      .find()
      .populate("adminId", "firstName lastName username role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    adminAuditLogModel.countDocuments(),
  ]);

  res.status(200).json({
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    },
  });
};

export {
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
};
