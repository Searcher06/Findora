import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    targetType: {
      type: String,
      enum: ["user", "item", "request", "flag", "system"],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    details: {
      type: Object,
      default: {},
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

schema.index({ createdAt: -1 });
schema.index({ adminId: 1, createdAt: -1 });

export const adminAuditLogModel = mongoose.model("AdminAuditLog", schema);
