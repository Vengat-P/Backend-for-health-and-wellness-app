import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/authSchema.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  //bearer token method
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "Token Missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
