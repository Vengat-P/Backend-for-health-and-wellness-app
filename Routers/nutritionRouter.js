import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  createNutritionLog,
  deleteNutritionLog,
  getAllLogs,
  updateNutritionLog,
} from "../Controllers/nutritionController.js";

const router = express.Router();

router.post("/create", authMiddleware, createNutritionLog);
router.get("/getnutritionlogs", authMiddleware, getAllLogs);
router.put("/update/:id", authMiddleware, updateNutritionLog);
router.delete("/delete/:id", authMiddleware, deleteNutritionLog);
export default router;
