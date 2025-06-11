import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  createGoal,
  getAllGoals,
  updateGoal,
} from "../Controllers/goalController.js";

const router = express.Router();

router.post("/create", authMiddleware, createGoal);
router.get("/getallgoals", authMiddleware, getAllGoals);
router.put("/update/:id", authMiddleware, updateGoal);
router.delete("/delete/:id", authMiddleware);
export default router;
