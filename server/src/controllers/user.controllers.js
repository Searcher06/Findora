import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { clearCookie } from "../utils/clearCookies.js";
import { textValidator } from "../utils/symbolchecker.js";
import { validateEmail } from "../utils/emailValidator.js";

const createUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  firstName = firstName.trim();
  lastName = lastName.trim();
  password = password.trim();

  // check if email is valid
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (firstName.length < 3 || lastName.length < 3) {
    res.status(400);
    throw new Error("Firstname and Lastname must be atleast 4 characters long");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be atleast 6 characters length");
  }

  let contains;
  const symbols = [
    "`",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "/",
    "[",
    "]",
    "{",
    "}",
    "|",
    ",",
    "'",
    `"`,
    ".",
    "?",
  ];
  symbols.forEach((current) => {
    if (firstName.includes(current) || lastName.includes(current)) {
      contains = true;
      return;
    }
  });

  if (contains) {
    res.status(400);
    throw new Error(
      "Use of special characters is not allowed for Firstname and Lastname"
    );
  }

  const salt = await bcrypt.genSalt(12);
  const hashedpwd = await bcrypt.hash(password, salt);

  let user = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedpwd,
  });

  if (user) {
    res.status(201).json({ ...user._doc, password: "" });
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
  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(user, res);
    res.status(200).json({ ...user._doc, password: "" });
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
  const user = await userModel.findById(req.user._id).select("-password");
  res.status(200).json(user);
};

const updateProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    oldPassword,
    newPassword,
    department,
    foculty,
  } = req.body;
  const condition =
    !firstName &&
    !lastName &&
    !email &&
    !oldPassword &&
    !newPassword &&
    !department &&
    !foculty;

  if (condition) {
    res.status(200).json({ message: "No changes made" });
  }

  const user = await userModel.findById(req.user._id);

  if (!user) {
    clearCookie(req, res);
    res.status(401);
    throw new Error("Not authorized, no user found");
  }

  if (firstName) {
    if (textValidator(firstName)) {
      res.status(401);
      throw new Error("Firstname can not contain special characters");
    }

    if (firstName.length < 3) {
      res.status(401);
      throw new Error("Firstname must be atlease 4 characters length");
    } else if (firstName.length > 20) {
      res.status(401);
      throw new Error("Firstname is 20 characters max");
    }

    user.firstName = firstName;
  }

  if (lastName) {
    if (textValidator(lastName)) {
      res.status(401);
      throw new Error("lastname can not contain special characters");
    }

    if (lastName.length < 3) {
      res.status(401);
      throw new Error("lastname must be atlease 4 characters length");
    } else if (lastName.length > 20) {
      res.status(401);
      throw new Error("lastname is 20 characters max");
    }

    user.lastName = lastName;
  }

  if (email) {
    if (!validateEmail(email)) {
      res.status(400);
      throw new Error("Please enter a valid email");
    }

    user.email = email;
  }
};
const getUserById = async (req, res) => {};
const userProfile = async (req, res) => {};

export {
  createUser,
  login,
  updateProfile,
  signOut,
  getUser,
  getUserById,
  userProfile,
};
