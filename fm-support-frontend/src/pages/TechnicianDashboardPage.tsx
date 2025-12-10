// src/pages/TechnicianDashboardPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTickets } from "../api";
import type { Ticket } from "../types";
import Card from "../components/Card";
import { useIsMobile } from "../hooks/useIsMobile";

export default function TechnicianDashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchTickets();
        setTickets(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load tickets", err);
        setError("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const openTickets = tickets.filter((t) => t.status === "OPEN");
  const inProgressTickets = tickets.filter((t) => t.status === "IN_PROGRESS");
  const completedTickets = tickets.filter((t) => t.status === "COMPLETED");

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header row */}
      <div
        style={{
          marginBottom: isMobile ? "14px" : "18px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: isMobile ? "1.3rem" : "1.5rem",
              marginBottom: 4,
            }}
          >
            Technician Dashboard
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              opacity: 0.75,
            }}
          >
            See all factory issues assigned to the service team.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "8px 14px",
            borderRadius: "999px",
            border: "none",
            background: "#111827",
            color: "white",
            fontSize: "0.8rem",
            cursor: "pointer",
            width: isMobile ? "100%" : "auto",
          }}
        >
          ← Back to Customer View
        </button>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "10px",
          marginBottom: isMobile ? "16px" : "20px",
        }}
      >
        <Card>
          <div
            style={{
              fontSize: "0.8rem",
              opacity: 0.75,
              marginBottom: "4px",
            }}
          >
            Open Tickets
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            {openTickets.length}
          </div>
        </Card>

        <Card>
          <div
            style={{
              fontSize: "0.8rem",
              opacity: 0.75,
              marginBottom: "4px",
            }}
          >
            In Progress
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            {inProgressTickets.length}
          </div>
        </Card>

        <Card>
          <div
            style={{
              fontSize: "0.8rem",
              opacity: 0.75,
              marginBottom: "4px",
            }}
          >
            Completed Today (Demo)
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            {completedTickets.length}
          </div>
        </Card>
      </div>

      {loading && (
        <p
          style={{
            fontSize: "0.85rem",
            opacity: 0.75,
          }}
        >
          Loading tickets…
        </p>
      )}
      {error && (
        <p
          style={{
            color: "#f97373",
            fontSize: "0.85rem",
            marginTop: "4px",
          }}
        >
          {error}
        </p>
      )}

      {/* Ticket columns */}
      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "minmax(0, 1fr)"
              : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
            marginTop: isMobile ? "10px" : "16px",
          }}
        >
          {/* Open tickets column */}
          <div>
            <h2
              style={{
                fontSize: "1rem",
                opacity: 0.9,
                marginBottom: "8px",
              }}
            >
              Open
            </h2>
            {openTickets.length === 0 && (
              <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                No open tickets.
              </p>
            )}
            {openTickets.map((t) => (
              <TicketCard
                key={t.id}
                ticket={t}
                onClick={() => navigate(`/tech/tickets/${t.id}`)}
              />
            ))}
          </div>

          {/* In-progress tickets column */}
          <div>
            <h2
              style={{
                fontSize: "1rem",
                opacity: 0.9,
                marginBottom: "8px",
              }}
            >
              In Progress
            </h2>
            {inProgressTickets.length === 0 && (
              <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                No tickets in progress.
              </p>
            )}
            {inProgressTickets.map((t) => (
              <TicketCard
                key={t.id}
                ticket={t}
                onClick={() => navigate(`/tech/tickets/${t.id}`)}
              />
            ))}
          </div>

          {/* Completed tickets column */}
          <div>
            <h2
              style={{
                fontSize: "1rem",
                opacity: 0.9,
                marginBottom: "8px",
              }}
            >
              Completed
            </h2>
            {completedTickets.length === 0 && (
              <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                No completed tickets yet.
              </p>
            )}
            {completedTickets.map((t) => (
              <TicketCard
                key={t.id}
                ticket={t}
                onClick={() => navigate(`/tech/tickets/${t.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TicketCard({
  ticket,
  onClick,
}: {
  ticket: Ticket;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      style={{
        marginBottom: "10px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <div
        style={{
          fontSize: "0.8rem",
          opacity: 0.7,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>Ticket: {ticket.id}</span>
        <StatusPill status={ticket.status} />
      </div>

      <div style={{ fontSize: "0.95rem", fontWeight: 500 }}>
        {ticket.description}
      </div>

      <div
        style={{
          fontSize: "0.8rem",
          opacity: 0.7,
        }}
      >
        Machine: {ticket.machineId} · Issue: {ticket.issueType}
      </div>

      <div
        style={{
          fontSize: "0.75rem",
          opacity: 0.6,
        }}
      >
        Created: {new Date(ticket.createdAt).toLocaleString()}
      </div>

      {ticket.aiSuggestion && (
        <div
          style={{
            marginTop: "4px",
            padding: "6px 8px",
            borderRadius: "10px",
            background: "rgba(15,23,42,0.9)",
            border: "1px dashed rgba(148,163,184,0.5)",
            fontSize: "0.8rem",
            whiteSpace: "pre-wrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 18,
              height: 18,
              borderRadius: "999px",
              background: "#22c55e",
              color: "black",
              fontSize: "0.7rem",
              fontWeight: 700,
              marginRight: "6px",
            }}
          >
            AI
          </span>
          {ticket.aiSuggestion.text}
        </div>
      )}
    </Card>
  );
}

function StatusPill({ status }: { status: Ticket["status"] }) {
  let label = status;
  let bg = "#1f2937";
  let border = "rgba(148,163,184,0.4)";

  if (status === "OPEN") {
    label = "Open";
    bg = "rgba(248,113,113,0.12)";
    border = "rgba(248,113,113,0.8)";
  } else if (status === "IN_PROGRESS") {
    label = "In Progress";
    bg = "rgba(251,191,36,0.12)";
    border = "rgba(251,191,36,0.9)";
  } else if (status === "COMPLETED") {
    label = "Completed";
    bg = "rgba(34,197,94,0.12)";
    border = "rgba(34,197,94,0.9)";
  }

  return (
    <div
      style={{
        padding: "3px 8px",
        borderRadius: "999px",
        border: `1px solid ${border}`,
        background: bg,
        fontSize: "0.75rem",
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  );
}
