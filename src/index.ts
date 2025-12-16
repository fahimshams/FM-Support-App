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
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  res.sendStatus(200);
});

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

// Global error handler - must be after all routes
// This ensures CORS headers are sent even when errors occur
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  
  // Set CORS headers even on error
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  
  // Send error response
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  // Set CORS headers for 404
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
  console.log(`CORS enabled for origins: ${allowedOrigins.join(', ')}`);
});
