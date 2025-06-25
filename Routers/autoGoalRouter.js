import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { createAutoGoal, deleteGoal, getAllGoals, getGoalLog, updateGoal } from "../Controllers/autoGoalController.js";


const router = express.Router();

router.post("/create", authMiddleware, createAutoGoal);
router.get("/getallgoals", authMiddleware, getAllGoals);
router.get("/getlog/:id",authMiddleware,getGoalLog)
router.put("/update/:id", authMiddleware, updateGoal);
router.delete("/delete/:id", authMiddleware,deleteGoal);

export default router;