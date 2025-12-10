// src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";  

import ticketsRouter from "./routes/tickets";
import machinesRouter from "./routes/machines";
import aiRouter from "./routes/ai";    

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());            
app.use(express.json());

// basic health check
app.get("/", (req, res) => {
  res.send("FM Support Backend Prototype is running.");
});

app.use("/public", express.static("public")); 

// API routes
app.use("/tickets", ticketsRouter);
app.use("/machines", machinesRouter);      
app.use("/ai", aiRouter);                   

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
