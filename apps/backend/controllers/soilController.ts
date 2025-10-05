// File: controllers/soilController.ts
import { Request, Response } from "express";
import prisma from "../prisma/prisma";

// -----------------------------
// Mock recommendation logic
// -----------------------------
function getSoilRecommendations(
  soilType: string,
  ph: number,
  nutrients: { N: number; P: number; K: number }
) {
  const recommendations: { name: string; quantity: string }[] = [];

  if (soilType === "sandy" && ph < 6) {
    recommendations.push({ name: "Lime", quantity: "50kg/acre" });
  }

  if (nutrients.N < 10) {
    recommendations.push({ name: "Nitrogen Fertilizer", quantity: "20kg/acre" });
  }

  if (nutrients.P < 5) {
    recommendations.push({ name: "Phosphorus Fertilizer", quantity: "15kg/acre" });
  }

  if (nutrients.K < 5) {
    recommendations.push({ name: "Potassium Fertilizer", quantity: "10kg/acre" });
  }

  if (recommendations.length === 0) {
    recommendations.push({ name: "No additional input needed", quantity: "-" });
  }

  return recommendations;
}

// -----------------------------
// Controller: Soil Fertility Advice
// -----------------------------
export const soilFertilityAdvice = async (req: Request, res: Response) => {
  try {
    const { userId, soilType, ph, nutrients } = req.body;

    // Validation
    if (!userId || !soilType || ph == null || !nutrients) {
      return res.status(400).json({ error: "Missing required soil data" });
    }

    const recommendations = getSoilRecommendations(soilType, ph, nutrients);

    // Save to database
    const savedAdvice = await prisma.soilReading.create({
      data: {
        userId,
        soilType,
        ph,
        nutrients,
        recommendedInputs: recommendations,
        createdAt: new Date(),
      },
    });

    return res.status(200).json({ analysis: savedAdvice });
  } catch (error) {
    console.error("Error during soil fertility advice:", error);
    return res.status(500).json({ error: "An internal server error occurred." });
  }
};
