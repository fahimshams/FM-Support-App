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
    <div>
      {/* Header */}
      <div
        style={{
          marginBottom: isMobile ? "20px" : "24px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: isMobile ? "1.5rem" : "1.75rem",
              marginBottom: "8px",
              color: "#1A1F36",
              fontWeight: 600,
            }}
          >
            Zoje Technician Dashboard
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#718096" }}>
            Manage all service tickets and machine issues in Bangladesh.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            background: "#FFFFFF",
            color: "#4A5568",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            width: isMobile ? "100%" : "auto",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F5F7FA";
            e.currentTarget.style.borderColor = "#CBD5E0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
            e.currentTarget.style.borderColor = "#E2E8F0";
          }}
        >
          ← Back to Customer View
        </button>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <Card style={{ padding: "20px" }}>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#718096",
              marginBottom: "8px",
              fontWeight: 500,
            }}
          >
            Open Tickets
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#DC2626" }}>
            {openTickets.length}
          </div>
        </Card>

        <Card style={{ padding: "20px" }}>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#718096",
              marginBottom: "8px",
              fontWeight: 500,
            }}
          >
            In Progress
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#D97706" }}>
            {inProgressTickets.length}
          </div>
        </Card>

        <Card style={{ padding: "20px" }}>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#718096",
              marginBottom: "8px",
              fontWeight: 500,
            }}
          >
            Completed
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#059669" }}>
            {completedTickets.length}
          </div>
        </Card>
      </div>

      {loading && (
        <Card style={{ padding: "40px", textAlign: "center" }}>
          <p style={{ fontSize: "0.95rem", color: "#718096" }}>Loading tickets…</p>
        </Card>
      )}
      {error && (
        <Card
          style={{
            padding: "20px",
            background: "#FEE2E2",
            border: "1px solid #FCA5A5",
            color: "#DC2626",
          }}
        >
          {error}
        </Card>
      )}

      {/* Ticket columns */}
      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "minmax(0, 1fr)"
              : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Open tickets column */}
          <div>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#1A1F36",
                marginBottom: "12px",
              }}
            >
              Open
            </h2>
            {openTickets.length === 0 && (
              <Card style={{ padding: "20px", textAlign: "center" }}>
                <p style={{ fontSize: "0.875rem", color: "#718096" }}>No open tickets.</p>
              </Card>
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
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#1A1F36",
                marginBottom: "12px",
              }}
            >
              In Progress
            </h2>
            {inProgressTickets.length === 0 && (
              <Card style={{ padding: "20px", textAlign: "center" }}>
                <p style={{ fontSize: "0.875rem", color: "#718096" }}>No tickets in progress.</p>
              </Card>
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
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#1A1F36",
                marginBottom: "12px",
              }}
            >
              Completed
            </h2>
            {completedTickets.length === 0 && (
              <Card style={{ padding: "20px", textAlign: "center" }}>
                <p style={{ fontSize: "0.875rem", color: "#718096" }}>
                  No completed tickets yet.
                </p>
              </Card>
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
        marginBottom: "12px",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "#718096",
            fontWeight: 500,
          }}
        >
          #{ticket.id}
        </span>
        <StatusPill status={ticket.status} />
      </div>

      <div
        style={{
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "#1A1F36",
          marginBottom: "8px",
          lineHeight: 1.5,
        }}
      >
        {ticket.description}
      </div>

      <div
        style={{
          fontSize: "0.875rem",
          color: "#718096",
          marginBottom: "8px",
        }}
      >
        Machine: {ticket.machineId} · {ticket.issueType.replace(/_/g, " ")}
      </div>

      <div
        style={{
          fontSize: "0.75rem",
          color: "#CBD5E0",
        }}
      >
        {new Date(ticket.createdAt).toLocaleString()}
      </div>

      {ticket.aiSuggestion && (
        <Card
          style={{
            marginTop: "12px",
            padding: "12px",
            background: "#E6F2FF",
            border: "1px solid #B3D9FF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "4px",
                background: "#0066CC",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
              }}
            >
              AI
            </div>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1A1F36" }}>
              Suggestion
            </span>
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#1A1F36",
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
            }}
          >
            {ticket.aiSuggestion.text}
          </div>
        </Card>
      )}
    </Card>
  );
}

function StatusPill({ status }: { status: Ticket["status"] }) {
  let label: string = status;
  let bg = "#F5F7FA";
  let textColor = "#4A5568";
  let border = "#E2E8F0";

  if (status === "OPEN") {
    label = "Open";
    bg = "#FEE2E2";
    textColor = "#DC2626";
    border = "#FCA5A5";
  } else if (status === "IN_PROGRESS") {
    label = "In Progress";
    bg = "#FEF3C7";
    textColor = "#D97706";
    border = "#FCD34D";
  } else if (status === "COMPLETED") {
    label = "Completed";
    bg = "#D1FAE5";
    textColor = "#059669";
    border = "#6EE7B7";
  }

  return (
    <div
      style={{
        padding: "4px 10px",
        borderRadius: "6px",
        border: `1px solid ${border}`,
        background: bg,
        fontSize: "0.75rem",
        fontWeight: 600,
        color: textColor,
      }}
    >
      {label}
    </div>
  );
}
