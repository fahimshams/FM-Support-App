// backend/src/routes/ai.ts
import express, { Request, Response } from "express";
import { chatWithAI, trainAIWithKnowledge, setKnowledgeBase, getKnowledgeBase } from "../services/geminiService";

const router = express.Router();

// Chat endpoint for AI Assistant
router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory } = req.body as {
      message: string;
      conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await chatWithAI(message, conversationHistory || []);
    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// Knowledge base management
router.get("/knowledge", (req: Request, res: Response) => {
  try {
    const items = getKnowledgeBase();
    res.json({ items });
  } catch (error) {
    console.error("Error fetching knowledge:", error);
    res.status(500).json({ error: "Failed to fetch knowledge items" });
  }
});

router.post("/knowledge", async (req: Request, res: Response) => {
  try {
    const { title, content, category, machineModel } = req.body as {
      title: string;
      content: string;
      category: string;
      machineModel?: string;
    };

    if (!title || !content || !category) {
      return res.status(400).json({ error: "Title, content, and category are required" });
    }

    const items = getKnowledgeBase();
    const newItem = {
      id: Date.now().toString(),
      title,
      content,
      category,
      machineModel,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    items.push(newItem);
    setKnowledgeBase(items);

    res.json({ item: newItem });
  } catch (error) {
    console.error("Error adding knowledge:", error);
    res.status(500).json({ error: "Failed to add knowledge item" });
  }
});

router.delete("/knowledge/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const items = getKnowledgeBase().filter((item) => item.id !== id);
    setKnowledgeBase(items);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting knowledge:", error);
    res.status(500).json({ error: "Failed to delete knowledge item" });
  }
});

// Training endpoint
router.post("/train", async (req: Request, res: Response) => {
  try {
    const result = await trainAIWithKnowledge();
    res.json(result);
  } catch (error) {
    console.error("Training error:", error);
    res.status(500).json({ error: "Failed to train AI" });
  }
});

// Training status
router.get("/training-status", (req: Request, res: Response) => {
  try {
    const items = getKnowledgeBase();
    res.json({
      totalItems: items.length,
      trainedItems: items.length,
      status: "idle",
    });
  } catch (error) {
    console.error("Error fetching training status:", error);
    res.status(500).json({ error: "Failed to fetch training status" });
  }
});

// Legacy diagnose endpoint (kept for backward compatibility)
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

    const response = await chatWithAI(question);
    const suggestedChecks = [
      "Take a short video of the problem (10–15s) and attach when creating a ticket.",
      "Note the exact fabric type and thread count you are using.",
      "Check if the issue happens on all speeds or only at high speed.",
    ];

    res.json({
      answer: response,
      suggestedChecks,
    });
  }
);

export default router;
