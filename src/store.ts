// src/store.ts
import type { Machine, Ticket, User, CachedAnswer, MachineInstance } from "./types";

export const machines: Machine[] = [
  {
    id: "m1",
    name: "Jack A4C",
    model: "A4C",
    organizationId: "org1",
  },
  {
    id: "m2",
    name: "Template Machine M9-A",
    model: "M9-A",
    organizationId: "org1",
  },
];

export const machineInstances: MachineInstance[] = [
  {
    id: "mi1",
    serialNumber: "A6-001-2025",
    machineId: "m1",
    organizationId: "org1",
    location: "Line 1 - Left",
  },
  {
    id: "mi2",
    serialNumber: "A6-002-2025",
    machineId: "m1",
    organizationId: "org1",
    location: "Line 1 - Right",
  },
  {
    id: "mi3",
    serialNumber: "A6-003-2025",
    machineId: "m1",
    organizationId: "org1",
    location: "Line 2 - Center",
  },
  {
    id: "mi4",
    serialNumber: "M9A-010-2025",
    machineId: "m2",
    organizationId: "org1",
    location: "Template Room",
  },
  {
    id: "mi5",
    serialNumber: "M9A-011-2025",
    machineId: "m2",
    organizationId: "org1",
    location: "Sample Room",
  },
];

export const users: User[] = [
  {
    id: "u1",
    name: "Operator Rahim",
    organizationId: "org1",
    aiCredits: 100,
  },
];

export const tickets: Ticket[] = [];

export const cache: CachedAnswer[] = [];
