// backend/src/routes/ai.ts
import express, { Request, Response } from "express";

const router = express.Router();

router.post(
  "/diagnose",
  async (req: Request, res: Response) => {
    const { question, machineModel, errorCode } = req.body as {
      question: string;
      machineModel?: string;
      errorCode?: string;
    };

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: "Question is required." });
    }

    const modelPart = machineModel ? ` for your ${machineModel}` : "";
    const errorPart = errorCode ? ` (error code: ${errorCode})` : "";

    const answer = [
      `I’ve read your issue${modelPart}${errorPart}. Here is a first quick diagnosis:`,
      "",
      "1) Check basic conditions:",
      "   • Power supply stable? Any voltage drops or loose plug?",
      "   • Air supply and oil level (if applicable) normal?",
      "",
      "2) Inspect the thread path:",
      "   • Re-thread completely from cone to needle.",
      "   • Check for burrs or sharp edges on the needle plate and hooks.",
      "",
      "3) Machine setting:",
      "   • Confirm the fabric and thread match the needle size.",
      "   • Reset to default tension and test on scrap fabric.",
      "",
      "If these do not solve it, please open a service ticket so a technician can review more details.",
    ].join("\n");

    const suggestedChecks = [
      "Take a short video of the problem (10–15s) and attach when creating a ticket.",
      "Note the exact fabric type and thread count you are using.",
      "Check if the issue happens on all speeds or only at high speed.",
    ];

    res.json({
      answer,
      suggestedChecks,
    });
  }
);

export default router;
