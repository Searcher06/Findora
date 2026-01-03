import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.id) {
      res.status(401);
      throw new Error("Invalid token, no user ID");
    }

    req.user = await userModel.findById(decodedToken.id).select("-password");

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
};

export default authMiddleWare;
