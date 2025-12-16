// src/routes/machines.ts
import { Router } from "express";
import { machines, machineInstances } from "../store";

const router = Router();

// GET /machines → list machine models for this org
router.get("/", (req, res) => {
  try {
    console.log('GET /machines - machines array length:', machines?.length);
    console.log('GET /machines - machines:', JSON.stringify(machines, null, 2));
    
    // later you can filter by org from auth; for now return all
    if (!machines) {
      console.error('machines is undefined or null');
      return res.status(500).json({ error: 'Machines data not available' });
    }
    
    res.json(machines);
  } catch (error: any) {
    console.error('Error in GET /machines:', error);
    console.error('Error stack:', error?.stack);
    console.error('Error message:', error?.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Unknown error',
      ...(process.env.NODE_ENV === 'development' && { stack: error?.stack })
    });
  }
});

// GET /machines/:machineId/instances → list serials for one machine
router.get("/:machineId/instances", (req, res) => {
  try {
    const { machineId } = req.params;
    
    if (!machineInstances) {
      console.error('machineInstances is undefined or null');
      return res.status(500).json({ error: 'Machine instances data not available' });
    }
    
    const list = machineInstances.filter((mi) => mi.machineId === machineId);
    res.json(list);
  } catch (error: any) {
    console.error('Error in GET /machines/:machineId/instances:', error);
    console.error('Error stack:', error?.stack);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Unknown error'
    });
  }
});

export default router;
