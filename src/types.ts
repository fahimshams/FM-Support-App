// src/types.ts

export type IssueType =
  | "THREAD_BREAKING"
  | "STITCH_SKIPPING"
  | "FABRIC_NOT_FEEDING";

export interface Machine {
  id: string;
  name: string;
  model: string;
  organizationId: string;
}

export interface MachineInstance {
  id: string;
  serialNumber: string;
  machineId: string;      
  organizationId: string;
  location?: string;
}

export interface User {
  id: string;
  name: string;
  organizationId: string;
  aiCredits: number;
}

export interface Ticket {
  id: string;
  machineId: string;
  createdByUserId: string;
  issueType: IssueType;
  description: string;
  createdAt: Date;
  aiSuggestion?: AiSuggestion;
}

export interface AiSuggestion {
  text: string;
  fromCache: boolean;
  creditsUsed: number;
  cacheKey: string;
}

export interface CachedAnswer {
  key: string;
  issueType: IssueType;
  text: string;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  machineId: string;
  createdByUserId: string;
  issueType: IssueType;
  description: string;

  aiSuggestion?: {
    text: string;
    fromCache: boolean;
    creditsUsed: number;
  };

  status: "OPEN" | "IN_PROGRESS" | "COMPLETED";
  technicianId?: string;
  technicianNotes?: string[];
  createdAt: string;
}

