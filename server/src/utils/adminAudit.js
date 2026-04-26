import { adminAuditLogModel } from "../models/adminAuditLog.model.js";

export const logAdminAction = async ({
  req,
  action,
  targetType,
  targetId,
  details = {},
}) => {
  if (!req?.user?._id) return;

  await adminAuditLogModel.create({
    adminId: req.user._id,
    action,
    targetType,
    targetId,
    details,
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
  });
};
