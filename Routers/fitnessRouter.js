import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { createFitnessLog, getAllLogs } from "../Controllers/fitnessController.js";

const router = express.Router();

router.post("/create",authMiddleware,createFitnessLog)
router.get("/getfitnesslogs",authMiddleware,getAllLogs)

export default router;