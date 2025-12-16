// src/services/geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

let genAI: GoogleGenerativeAI | null = null;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  machineModel?: string;
}

// In-memory knowledge base (in production, use a vector database)
let knowledgeBase: KnowledgeItem[] = [];

export function setKnowledgeBase(items: KnowledgeItem[]) {
  knowledgeBase = items;
}

export function getKnowledgeBase(): KnowledgeItem[] {
  return knowledgeBase;
}

function buildContextFromKnowledge(query: string): string {
  // Simple keyword matching for context (in production, use vector embeddings)
  const relevantItems = knowledgeBase.filter(
    (item) =>
      item.content.toLowerCase().includes(query.toLowerCase()) ||
      item.title.toLowerCase().includes(query.toLowerCase())
  );

  if (relevantItems.length === 0) {
    return "";
  }

  return relevantItems
    .slice(0, 5) // Limit to top 5 relevant items
    .map(
      (item) =>
        `[${item.category.toUpperCase()}] ${item.title}\n${item.content}\n`
    )
    .join("\n---\n\n");
}

export async function chatWithAI(
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  if (!genAI) {
    // Fallback response if Gemini API is not configured
    return "I apologize, but the AI service is not configured. Please contact support for assistance.";
  }

  try {
    // Build context from knowledge base
  const context = buildContextFromKnowledge(message);
  
  // Build system prompt with context
  const systemPrompt = `You are a helpful AI assistant for Zoje Machineries Support in Bangladesh. 
You help customers with machine troubleshooting, maintenance, and technical questions.

${context ? `\nRelevant Information:\n${context}\n` : ""}

Guidelines:
- Be professional, friendly, and helpful
- Use the provided context to answer questions accurately
- If you don't know something, suggest contacting support
- Provide step-by-step instructions when possible
- Focus on practical solutions for industrial sewing machines

Respond in a clear, concise manner.`;

  // Build conversation history
  const historyText = conversationHistory
    .slice(-6) // Last 6 messages for context
    .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
    .join("\n");

  const fullPrompt = `${systemPrompt}\n\n${historyText ? `Previous conversation:\n${historyText}\n\n` : ""}User: ${message}\nAssistant:`;

  // Try different model names in order of preference
  // Note: Model availability depends on API key permissions, region, and API version
  const modelNames = [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-pro", // Original model - may still work in some regions
  ];

  let lastError: any = null;

  for (const modelName of modelNames) {
    try {
      const model = genAI!.getGenerativeModel({ model: modelName });
      console.log(`Trying model: ${modelName}`);
      
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      console.log(`Successfully using model: ${modelName}`);
      return response.text();
    } catch (err: any) {
      lastError = err;
      // If it's a 404 (model not found), try next model
      if (err.status === 404 || err.message?.includes("not found") || err.message?.includes("404")) {
        console.log(`Model ${modelName} not available (404), trying next...`);
        continue;
      }
      // For other errors, throw immediately
      throw err;
    }
  }

    // If all models failed with 404
    console.error("All Gemini models failed. Last error:", lastError);
    console.error("Tried models:", modelNames.join(", "));
    console.error("Please check:");
    console.error("1. Your GEMINI_API_KEY is valid and has proper permissions");
    console.error("2. The models are available in your region");
    console.error("3. Visit https://aistudio.google.com/app/apikey to verify your API key");
    return "I apologize, but the AI service is currently unavailable. All Gemini models returned 404 errors. Please verify your API key at https://aistudio.google.com/app/apikey and ensure it has access to Gemini models.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I apologize, but I encountered an error. Please try again or contact support.";
  }
}

export async function trainAIWithKnowledge(): Promise<{
  totalItems: number;
  trainedItems: number;
}> {
  // In a real implementation, this would:
  // 1. Generate embeddings for all knowledge items
  // 2. Store them in a vector database
  // 3. Set up retrieval system
  
  // For now, we just return the count
  return {
    totalItems: knowledgeBase.length,
    trainedItems: knowledgeBase.length,
  };
}

