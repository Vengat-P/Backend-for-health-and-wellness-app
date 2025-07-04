import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  createGoal,
  deleteGoal,
  getAllGoals,
  getGoalLog,
  updateGoal,
} from "../Controllers/goalController.js";

const router = express.Router();

router.post("/create", authMiddleware, createGoal);
router.get("/getallgoals", authMiddleware, getAllGoals);
router.get("/getlog/:id",authMiddleware,getGoalLog)
router.put("/update/:id", authMiddleware, updateGoal);
router.delete("/delete/:id", authMiddleware,deleteGoal);
export default router;
