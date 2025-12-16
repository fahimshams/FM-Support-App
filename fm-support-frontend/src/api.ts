// fm-support-frontend/src/api.ts
import type {
  CreateTicketPayload,
  Ticket,
  Machine,
  MachineInstance,
} from "./types";

// Use environment variable for API URL, fallback to localhost for development
export const BASE_URL =
  import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:4000`;

export async function createTicket(
  payload: CreateTicketPayload
): Promise<{ ticket: Ticket; remainingCredits: number }> {
  const res = await fetch(`${BASE_URL}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to create ticket: ${res.status}`);
  }

  return res.json();
}

export async function fetchTickets(): Promise<Ticket[]> {
  const res = await fetch(`${BASE_URL}/tickets`);
  if (!res.ok) {
    throw new Error(`Failed to fetch tickets: ${res.status}`);
  }
  return res.json();
}

export async function fetchMachines(): Promise<Machine[]> {
  const res = await fetch(`${BASE_URL}/machines`);
  if (!res.ok) {
    throw new Error(`Failed to fetch machines: ${res.status}`);
  }
  return res.json();
}

export async function fetchMachineInstances(
  machineId: string
): Promise<MachineInstance[]> {
  if (!machineId || machineId.trim() === "") {
    throw new Error("Machine ID cannot be empty");
  }
  
  const res = await fetch(`${BASE_URL}/machines/${machineId}/instances`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch machine instances for ${machineId}: ${res.status}`
    );
  }
  return res.json();
}

export async function updateTicket(
  ticketId: string,
  data: { status?: string; technicianId?: string; note?: string }
): Promise<{ ok: boolean; ticket: Ticket }> {
  const res = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to update ticket: ${res.status}`);
  }

  return res.json();
}
