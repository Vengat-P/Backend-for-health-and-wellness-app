import express from "express";
import {
  forgotPassword,
  getUser,
  loginUser,
  registerUser,
  resetPassword,
  updateUserInfo,
} from "../Controllers/authController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.put("/update/:id",authMiddleware,updateUserInfo)
router.get("/getuser",authMiddleware,getUser)

export default router;
