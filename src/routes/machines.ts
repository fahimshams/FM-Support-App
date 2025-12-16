// src/routes/machines.ts
import { Router } from "express";
import { machines, machineInstances } from "../store";

const router = Router();

// GET /machines → list machine models for this org
router.get("/", (req, res) => {
  try {
    // later you can filter by org from auth; for now return all
    res.json(machines);
  } catch (error) {
    console.error('Error in GET /machines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /machines/:machineId/instances → list serials for one machine
router.get("/:machineId/instances", (req, res) => {
  const { machineId } = req.params;
  const list = machineInstances.filter((mi) => mi.machineId === machineId);
  res.json(list);
});

export default router;
