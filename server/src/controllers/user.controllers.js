import { userModel } from "../models/user.model";

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

  const userExists = await userModel.find({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (firstName.length < 3 || lastName.length < 3) {
    res.status(400);
    throw new Error("Firstname and Lastname must be atleast 4 characters long");
  }
};

const login = async (req, res) => {};
const updateProfile = async (req, res) => {};
const getUser = async (req, res) => {};
const signOut = async (req, res) => {};
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
