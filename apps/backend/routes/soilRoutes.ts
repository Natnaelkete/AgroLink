import { Router } from "express";
import { soilFertilityAdvice } from "../controllers/soilController";

const router = Router();

// POST endpoint to submit soil data and get recommendations
router.post("/advice", soilFertilityAdvice);

export default router;
