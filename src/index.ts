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

// Function to check if origin is allowed (including Vercel preview URLs)
function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return false;
  
  // Check exact matches
  if (allowedOrigins.includes(origin)) return true;
  
  // Allow all Vercel preview URLs (they follow pattern: *.vercel.app)
  // Examples: 
  // - https://fm-support-app-git-main-fahimshams-projects.vercel.app
  // - https://fm-support-app-*.vercel.app
  if (origin.includes('.vercel.app')) {
    return true;
  }
  
  return false;
}

// Custom CORS middleware that ALWAYS sets headers (even on errors)
// This must be the VERY FIRST middleware - before anything else
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Log all requests for debugging
  console.log(`[${req.method}] ${req.path} - Origin: ${origin || 'none'}`);
  
  // Always set CORS headers if origin is allowed (including Vercel preview URLs)
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(`✅ CORS headers set for origin: ${origin}`);
  } else if (origin) {
    console.warn(`❌ CORS blocked origin: ${origin}`);
    console.warn(`   Allowed origins: ${allowedOrigins.join(', ')}, *.vercel.app`);
  }
  
  // Handle preflight requests immediately
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS preflight request - sending 200');
    return res.sendStatus(200);
  }
  
  next();
});

// Also use cors middleware as backup - but make it simpler
// This will handle CORS for all requests that pass through
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is allowed (including Vercel preview URLs)
    if (isOriginAllowed(origin)) {
      console.log(`✅ cors() middleware allowing: ${origin}`);
      callback(null, true);
    } else {
      // Log the blocked origin for debugging
      console.warn(`❌ cors() middleware blocked origin: ${origin}`);
      console.warn(`   Allowed origins: ${allowedOrigins.join(', ')}, *.vercel.app`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// basic health check
app.get("/", (req, res) => {
  res.send("Zoje Machineries Support Backend is running.");
});

// Health check endpoint for debugging
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
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
  
  // Set CORS headers even on error (including Vercel preview URLs)
  const origin = req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
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
  // Set CORS headers for 404 (including Vercel preview URLs)
  const origin = req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  
  res.status(404).json({ error: 'Route not found' });
});

// Start server with error handling
try {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server listening on http://0.0.0.0:${PORT}`);
    console.log(`✅ CORS enabled for origins: ${allowedOrigins.join(', ')}, *.vercel.app`);
    console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✅ CORS function will allow all .vercel.app domains`);
  });
} catch (error) {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}
