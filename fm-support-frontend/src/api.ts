// fm-support-frontend/src/api.ts
import type {
  CreateTicketPayload,
  Ticket,
  Machine,
  MachineInstance,
} from "./types";

// Use environment variable for API URL, fallback to localhost for development
// IMPORTANT: Set VITE_API_URL in Vercel environment variables to your Render backend URL
// Example: VITE_API_URL=https://fm-support-app.onrender.com
export const BASE_URL =
  import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV 
    ? `${window.location.protocol}//${window.location.hostname}:4000` 
    : ''); // In production, require VITE_API_URL to be set

// Log the API URL being used (only in development)
if (import.meta.env.DEV) {
  console.log('API Base URL:', BASE_URL);
}

// Warn if BASE_URL is empty in production
if (!BASE_URL && !import.meta.env.DEV) {
  console.error('VITE_API_URL is not set! API calls will fail.');
}

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
  if (!BASE_URL) {
    throw new Error('API URL is not configured. Please set VITE_API_URL environment variable.');
  }
  
  const url = `${BASE_URL}/tickets`;
  console.log('Fetching tickets from:', url);
  
  const res = await fetch(url);
  
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error');
    console.error('Failed to fetch tickets:', {
      status: res.status,
      statusText: res.statusText,
      error: errorText,
      url
    });
    throw new Error(`Failed to fetch tickets: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function fetchMachines(): Promise<Machine[]> {
  if (!BASE_URL) {
    throw new Error('API URL is not configured. Please set VITE_API_URL environment variable.');
  }
  
  const url = `${BASE_URL}/machines`;
  console.log('Fetching machines from:', url);
  
  const res = await fetch(url);
  
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error');
    console.error('Failed to fetch machines:', {
      status: res.status,
      statusText: res.statusText,
      error: errorText,
      url
    });
    throw new Error(`Failed to fetch machines: ${res.status} ${res.statusText}`);
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
