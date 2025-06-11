import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  createFitnessLog,
  deleteFitnessLog,
  getAllLogs,
  updateFitnessLog,
} from "../Controllers/fitnessController.js";

const router = express.Router();

router.post("/create", authMiddleware, createFitnessLog);
router.get("/getfitnesslogs", authMiddleware, getAllLogs);
router.put("/update/:id", authMiddleware, updateFitnessLog);
router.delete("/delete/:id", authMiddleware, deleteFitnessLog);
export default router;
