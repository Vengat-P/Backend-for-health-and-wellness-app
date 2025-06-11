import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { createFitnessLog } from "../Controllers/fitnessController.js";

const router = express.Router();

router.post("/create",authMiddleware,createFitnessLog)


export default router;