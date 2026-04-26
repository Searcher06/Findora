import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { clearCookie } from "../utils/clearCookies.js";
import { textValidator } from "../utils/symbolchecker.js";
import { validateEmail } from "../utils/emailValidator.js";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { verifyEmailTemplate, resetPasswordTemplate } from "../utils/emailTemplates.js";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

const applyNewPassword = async (user, newPassword) => {
  user.password = await hashPassword(newPassword);
  user.passwordChangedAt = new Date();
  user.tokenVersion = (user.tokenVersion || 0) + 1;
};

const sanitizeUser = (user) => {
  if (!user) return user;
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  delete obj.emailVerificationToken;
  delete obj.emailVerificationExpires;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpires;
  delete obj.__v;
  return obj;
};

const createUser = async (req, res) => {
  let { firstName, lastName, email, password, username } = req.body;
  if (!firstName || !lastName || !email || !password || !username) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  firstName = firstName.trim();
  lastName = lastName.trim();
  password = password.trim();
  username = username.trim();

  // check if email is valid
  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  let lowercasedUsername = username.toLowerCase();
  const userNameExists = await userModel.findOne({
    username: lowercasedUsername,
  });
  if (userNameExists) {
    res.status(400);
    throw new Error("Username unavailable. Try a different one");
  }

  if (username.length < 4) {
    res.status(400);
    throw new Error("Username must be atleast 4 characters long");
  } else if (username.includes(" ")) {
    res.status(400);
    throw new Error("Username cannot contain spaces");
  }

  if (textValidator(username)) {
    res.status(400);
    throw new Error("Username can only contain letters and numbers");
  }

  if (firstName.length < 4 || lastName.length < 4) {
    res.status(400);
    throw new Error("Firstname and Lastname must be atleast 4 characters long");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be atleast 6 characters length");
  }

  if (textValidator(firstName) || textValidator(lastName)) {
    res.status(400);
    throw new Error("Use of special characters is not allowed for Firstname and Lastname");
  }

  const hashedpwd = await hashPassword(password);

  const rawEmailtoken = crypto.randomBytes(32).toString("hex");
  const hashedEmailToken = crypto.createHash("sha256").update(rawEmailtoken).digest("hex");

  let user = await userModel.create({
    firstName,
    lastName,
    email,
    username: lowercasedUsername,
    displayUsername: username,
    password: hashedpwd,
    emailVerificationToken: hashedEmailToken,
    emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
  });

  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawEmailtoken}`;

  const html = verifyEmailTemplate(firstName, verifyUrl);

  await sendEmail({
    to: email,
    subject: "Verify Your Findora Account",
    html,
  });

  if (user) {
    generateToken(user, res);
    res.status(201).json(sanitizeUser(user));
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};
const login = async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  let user = await userModel.findOne({ email });
  if (user && user.isSuspended) {
    res.status(403);
    throw new Error("Your account has been suspended");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(user, res);
    res.status(200).json(sanitizeUser(user));
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
};
const signOut = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
const getUser = async (req, res) => {
  const user = await userModel.findById(req.user._id);
  res.status(200).json(sanitizeUser(user));
};
const updateProfile = async (req, res) => {
  const { firstName, lastName, email, oldPassword, newPassword, department, foculty } = req.body;

  // Check if there are any changes including file upload
  const condition =
    !firstName &&
    !lastName &&
    !email &&
    !oldPassword &&
    !newPassword &&
    department === undefined && // Changed from !department
    foculty === undefined && // Changed from !foculty
    !req.file; // Also check for file upload

  if (condition) {
    return res.status(200).json({ message: "No changes made" });
  }

  const user = await userModel.findById(req.user._id);

  if (!user) {
    clearCookie(req, res);
    res.status(401);
    throw new Error("Not authorized, no user found");
  }

  if (firstName) {
    if (textValidator(firstName)) {
      res.status(400);
      throw new Error("Firstname can not contain special characters");
    }

    if (firstName.length < 3) {
      res.status(400);
      throw new Error("Firstname must be atlease 4 characters length");
    } else if (firstName.length > 20) {
      res.status(401);
      throw new Error("Firstname is 20 characters max");
    }

    user.firstName = firstName;
  }

  if (lastName) {
    if (textValidator(lastName)) {
      res.status(400);
      throw new Error("lastname can not contain special characters");
    }

    if (lastName.length < 3) {
      res.status(400);
      throw new Error("lastname must be atlease 4 characters length");
    } else if (lastName.length > 20) {
      res.status(400);
      throw new Error("lastname is 20 characters max");
    }

    user.lastName = lastName;
  }

  if (email) {
    if (!validateEmail(email)) {
      res.status(400);
      throw new Error("Please enter a valid email");
    }

    const checkEmail = await userModel.findOne({ email });
    // checking if the new email exists
    if (checkEmail) {
      res.status(400);
      throw new Error("User already exist!");
    }

    user.email = email;
  }

  let passwordUpdated = false;

  if (oldPassword) {
    if (!newPassword) {
      res.status(400);
      throw new Error("Fill in the new password!");
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      res.status(400);
      throw new Error("Old password is incorrect");
    }

    if (newPassword.length < 6) {
      res.status(400);
      throw new Error("New password must be atleast 6 characters long");
    }

    await applyNewPassword(user, newPassword);
    passwordUpdated = true;
  }

  // Check if department is defined (can be empty string to clear)
  if (department !== undefined) {
    user.department = department; // This allows empty string to clear the field
  }

  // Check if foculty is defined (can be empty string to clear)
  if (foculty !== undefined) {
    user.foculty = foculty; // This allows empty string to clear the field
  }

  const file = req.file;
  if (file) {
    // Validation checks first
    if (!file.mimetype.startsWith("image/")) {
      res.status(400);
      throw new Error("Uploaded file is not an image");
    }
    if (file.size > 5 * 1024 * 1024) {
      res.status(400);
      throw new Error("File size must be less than 5MB");
    }
    if (!file.buffer) {
      res.status(400);
      throw new Error("File data is corrupted");
    }
    // Upload to Cloudinary
    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "profile_pics",
    });

    user.profilePic = uploadResult.secure_url;
  }

  await user.save();

  if (passwordUpdated) {
    generateToken(user, res);
  }

  const updatedUser = await userModel.findById(user._id);
  res.status(200).json(sanitizeUser(updatedUser));
};
const getUserByUsername = async (req, res) => {
  // Getting the username from the request parameter
  const { username } = req.params;

  // Getting the full user info from the username provided
  const user = await userModel.findOne({ username: username });

  // checking if user does not exist
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(sanitizeUser(user));
};
const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await userModel.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  res.status(200).json({ message: "Email verified successfully" });
};
const resendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide an email");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("Email is already verified");
  }

  const rawEmailtoken = crypto.randomBytes(32).toString("hex");
  const hashedEmailToken = crypto.createHash("sha256").update(rawEmailtoken).digest("hex");

  user.emailVerificationToken = hashedEmailToken;
  user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();

  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawEmailtoken}`;
  const html = verifyEmailTemplate(user.firstName, verifyUrl);
  await sendEmail({
    to: user.email,
    subject: "Verify your email",
    html: html,
  });

  res.status(200).json({ message: "Verification email sent" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide an email");
  }

  const user = await userModel.findOne({ email: email.trim().toLowerCase() });
  const genericMessage = "If that email exists, a password reset link has been sent";

  if (!user) {
    return res.status(200).json({ message: genericMessage });
  }

  const rawResetToken = crypto.randomBytes(32).toString("hex");
  const hashedResetToken = crypto.createHash("sha256").update(rawResetToken).digest("hex");

  user.passwordResetToken = hashedResetToken;
  user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawResetToken}`;
  const html = resetPasswordTemplate(user.firstName, resetUrl);

  await sendEmail({
    to: user.email,
    subject: "Reset your Findora password",
    html,
  });

  res.status(200).json({ message: genericMessage });
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    res.status(400);
    throw new Error("Token and password are required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be atleast 6 characters long");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  await applyNewPassword(user, password);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful. Please login with your new password" });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Current password and new password are required");
  }

  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("New password must be atleast 6 characters long");
  }

  const user = await userModel.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isCurrentPasswordValid) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  if (await bcrypt.compare(newPassword, user.password)) {
    res.status(400);
    throw new Error("New password must be different from current password");
  }

  await applyNewPassword(user, newPassword);
  await user.save();
  generateToken(user, res);

  res.status(200).json({ message: "Password changed successfully" });
};

export { createUser, login, updateProfile, signOut, getUser, getUserByUsername, verifyEmail, resendEmail, forgotPassword, resetPassword, changePassword };
