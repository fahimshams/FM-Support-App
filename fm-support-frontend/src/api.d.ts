import type { CreateTicketPayload, Ticket, Machine, MachineInstance } from "./types";
export declare const BASE_URL: any;
export declare function createTicket(payload: CreateTicketPayload): Promise<{
    ticket: Ticket;
    remainingCredits: number;
}>;
export declare function fetchTickets(): Promise<Ticket[]>;
export declare function fetchMachines(): Promise<Machine[]>;
export declare function fetchMachineInstances(machineId: string): Promise<MachineInstance[]>;
export declare function updateTicket(ticketId: string, data: {
    status?: string;
    technicianId?: string;
    note?: string;
}): Promise<{
    ok: boolean;
    ticket: Ticket;
}>;
//# sourceMappingURL=api.d.ts.map