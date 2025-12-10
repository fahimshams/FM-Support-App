import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTickets } from "../api";
import type { Ticket } from "../types";
import Card from "../components/Card";

export default function TicketHistoryPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchTickets();
        // for demo we show all users' tickets 
        setTickets(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load ticket history");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      {/* Header row */}
      <div
        style={{
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.4rem", marginBottom: 4 }}>
            Ticket History
          </h1>
          <p style={{ fontSize: "0.9rem", opacity: 0.75 }}>
            All issues raised from your factory (demo data).
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "6px 12px",
            borderRadius: "999px",
            border: "none",
            background: "#111827",
            color: "white",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {loading && <p>Loading tickets…</p>}
      {error && <p style={{ color: "#f97373" }}>{error}</p>}

      {!loading && tickets.length === 0 && !error && (
        <p style={{ opacity: 0.75 }}>No tickets yet. Try raising an issue.</p>
      )}

      {/* List of tickets */}
      {!loading && tickets.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {tickets.map((t) => (
            <Card
              key={t.id}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 3fr) minmax(0, 1fr)",
                gap: "10px",
              }}
            >
              {/* Left side: main info */}
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    marginBottom: "4px",
                  }}
                >
                  Ticket ID: {t.id} · Machine: {t.machineId} · Issue:{" "}
                  {t.issueType}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    marginBottom: "4px",
                    fontWeight: 500,
                  }}
                >
                  {t.description}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.65,
                    marginBottom: "6px",
                  }}
                >
                  Created: {new Date(t.createdAt).toLocaleString()}
                </div>

                {t.aiSuggestion && (
                  <div
                    style={{
                      marginTop: "4px",
                      padding: "8px",
                      borderRadius: "10px",
                      background: "rgba(15,23,42,0.9)",
                      border: "1px dashed rgba(148,163,184,0.5)",
                      fontSize: "0.85rem",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "4px",
                        fontWeight: 500,
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
                        }}
                      >
                        AI
                      </span>
                      <span>Suggestion</span>
                    </div>
                    {t.aiSuggestion.text}
                  </div>
                )}

                {t.technicianNotes && t.technicianNotes.length > 0 && (
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "0.85rem",
                      opacity: 0.85,
                    }}
                  >
                    <strong>Technician Notes:</strong>{" "}
                    {t.technicianNotes.join(" | ")}
                  </div>
                )}
              </div>

              {/* Right side: status + small meta */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <StatusPill status={t.status} />
                {t.aiSuggestion && (
                  <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                    {t.aiSuggestion.fromCache
                      ? "AI: cached answer (no charge)"
                      : `AI: used ${t.aiSuggestion.creditsUsed} credit(s)`}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
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
    label = "Resolved";
    bg = "rgba(34,197,94,0.12)";
    border = "rgba(34,197,94,0.9)";
  }

  return (
    <div
      style={{
        padding: "4px 10px",
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
