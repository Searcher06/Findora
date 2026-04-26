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

    const user = await userModel.findById(decodedToken.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    if (user.isSuspended) {
      res.status(403);
      throw new Error("Your account has been suspended");
    }

    if ((decodedToken.tokenVersion || 0) !== (user.tokenVersion || 0)) {
      res.status(401);
      throw new Error("Session expired. Please login again");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    if (res.statusCode !== 200) {
      throw error;
    }
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
};

export default authMiddleWare;
