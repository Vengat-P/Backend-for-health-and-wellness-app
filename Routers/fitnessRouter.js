import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  createFitnessLog,
  deleteFitnessLog,
  getAllLogs,
  updateFitnessLog,
  updateUserDetail,
} from "../Controllers/fitnessController.js";

const router = express.Router();

router.post("/create", authMiddleware, createFitnessLog);
router.get("/getfitnesslogs", authMiddleware, getAllLogs);
router.put("/update/:id", authMiddleware, updateFitnessLog,updateUserDetail);
router.delete("/delete/:id", authMiddleware, deleteFitnessLog);
export default router;
