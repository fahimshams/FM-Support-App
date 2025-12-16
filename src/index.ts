// src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";  

import ticketsRouter from "./routes/tickets";
import machinesRouter from "./routes/machines";
import aiRouter from "./routes/ai";    

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// CORS configuration - allow frontend URL from environment or default to allow all in development
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://fm-support-app.vercel.app', // Production Vercel frontend
  process.env.FRONTEND_URL, // Additional frontend URL from environment
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Log the blocked origin for debugging
      console.warn(`CORS blocked origin: ${origin}`);
      console.warn(`Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// basic health check
app.get("/", (req, res) => {
  res.send("Zoje Machineries Support Backend is running.");
});

app.use("/public", express.static("public")); 

// API routes
app.use("/tickets", ticketsRouter);
app.use("/machines", machinesRouter);      
app.use("/ai", aiRouter);                   

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
