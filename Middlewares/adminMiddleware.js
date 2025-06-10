import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/authSchema.js";
import req from "express/lib/request";

dotenv.config();

export const adminMiddleware = async (req, res, next) => {
  //using bearer token
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user._id);
    if (user.role === "admin") {
      next();
    } else {
      res.status(404).json({ message: "Access Denied" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
