// fm-support-frontend/src/types.ts

export type IssueType =
  | "THREAD_BREAKING"
  | "STITCH_SKIPPING"
  | "FABRIC_NOT_FEEDING";

export interface AiSuggestion {
  text: string;
  fromCache: boolean;
  creditsUsed: number;
  cacheKey: string;
}

export interface Ticket {
  id: string;
  machineId: string;
  createdByUserId: string;
  issueType: IssueType;
  description: string;
  createdAt: string;
  aiSuggestion?: AiSuggestion;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED";
  technicianId?: string;
  technicianNotes?: string[];
}

export interface CreateTicketPayload {
  machineId: string;
  createdByUserId: string;
  issueType: IssueType;
  description: string;
}

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
