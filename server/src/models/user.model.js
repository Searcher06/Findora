import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Firstname is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  displayUsername: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  passwordChangedAt: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpires: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["student", "admin", "moderator"],
    default: "student",
  },
  trustPoints: {
    type: Number,
    default: 0,
    min: 0,
  },
  successfulReturns: {
    type: Number,
    default: 0,
    min: 0,
  },
  hasVerifiedReturnBadge: {
    type: Boolean,
    default: false,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  suspensionReason: {
    type: String,
    trim: true,
  },
  suspendedAt: {
    type: Date,
  },
  department: {
    type: String,
    trim: true,
  },
  foculty: {
    type: String,
    trim: true,
  },
  whatsappPhone: {
    type: String,
    trim: true,
    match: [/^\+[1-9]\d{6,14}$/, "Phone number must be in international format (e.g. +2347012345678)"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating a model
export const userModel = mongoose.model("User", schema);
