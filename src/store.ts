// src/store.ts
import type { Machine, Ticket, User, CachedAnswer, MachineInstance } from "./types";

export const machines: Machine[] = [
  {
    id: "m1",
    name: "Zoje A6000-G Lockstitch",
    model: "A6000-G",
    organizationId: "org1",
  },
  {
    id: "m2",
    name: "Zoje B9500 Overlock",
    model: "B9500",
    organizationId: "org1",
  },
  {
    id: "m3",
    name: "Zoje ZJ-M6 Template Machine",
    model: "ZJ-M6",
    organizationId: "org1",
  },
];

export const machineInstances: MachineInstance[] = [
  {
    id: "mi1",
    serialNumber: "ZJ-A6000-001-2024",
    machineId: "m1",
    organizationId: "org1",
    location: "Production Line 1 - Station A",
  },
  {
    id: "mi2",
    serialNumber: "ZJ-A6000-002-2024",
    machineId: "m1",
    organizationId: "org1",
    location: "Production Line 1 - Station B",
  },
  {
    id: "mi3",
    serialNumber: "ZJ-B9500-001-2024",
    machineId: "m2",
    organizationId: "org1",
    location: "Production Line 2 - Overlock Section",
  },
  {
    id: "mi4",
    serialNumber: "ZJ-M6-001-2024",
    machineId: "m3",
    organizationId: "org1",
    location: "Template Section - Dhaka Factory",
  },
  {
    id: "mi5",
    serialNumber: "ZJ-A6000-003-2024",
    machineId: "m1",
    organizationId: "org1",
    location: "Production Line 3 - Station A",
  },
];

export const users: User[] = [
  {
    id: "u1",
    name: "Factory Operator - Bangladesh",
    organizationId: "org1",
    aiCredits: 100,
  },
];

export const tickets: Ticket[] = [];

export const cache: CachedAnswer[] = [];
