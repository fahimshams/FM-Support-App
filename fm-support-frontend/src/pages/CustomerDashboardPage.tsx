// src/pages/CustomerDashboardPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMachines, fetchTickets } from "../api";
import type { Machine, Ticket } from "../types";
import Card from "../components/Card";
import { useIsMobile } from "../hooks/useIsMobile";

export default function CustomerDashboardPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  // ---- search-related state ----
  const [searchSerial, setSearchSerial] = useState("");
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [machineHistory, setMachineHistory] = useState<Ticket[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  // -----------------------------------

  const navigate = useNavigate();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [machinesData, ticketsData] = await Promise.all([
          fetchMachines(),
          fetchTickets(),
        ]);
        setMachines(machinesData);
        setTickets(ticketsData);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalMachines = machines.length;
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "OPEN").length;
  const completedTickets = tickets.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  // ---- handle search by serial ----
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const value = searchSerial.trim();
    if (!value) {
      setSelectedMachine(null);
      setMachineHistory([]);
      setSearchError("Please enter a serial number.");
      return;
    }

    const machine = machines.find(
      (m: any) =>
        String(m.serialNumber ?? m.serial ?? "").toLowerCase() ===
        value.toLowerCase()
    );

    if (!machine) {
      setSelectedMachine(null);
      setMachineHistory([]);
      setSearchError("No machine found with this serial number.");
      return;
    }

    // Filter tickets for that machine
    const history = tickets.filter((t: any) => {
      const ticketSerial =
        t.machineSerial ?? t.serialNumber ?? t.machine?.serialNumber;
      return (
        ticketSerial &&
        String(ticketSerial).toLowerCase() === value.toLowerCase()
      );
    });

    setSelectedMachine(machine as Machine);
    setMachineHistory(history as Ticket[]);
    setSearchError(null);
  };
  // --------------------------------------

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        paddingBottom: "24px",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          marginBottom: isMobile ? "16px" : "20px",
          gap: "10px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: isMobile ? "1.4rem" : "1.7rem",
              marginBottom: "4px",
            }}
          >
            FM Factory Support
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              opacity: 0.8,
            }}
          >
            One panel for all machine issues, AI suggestions & history.
          </p>
        </div>

        <button
          onClick={() => navigate("/tickets/history")}
          style={{
            padding: "8px 16px",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(135deg, rgba(59,130,246,1), rgba(129,140,248,1))",
            color: "white",
            fontSize: "0.8rem",
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(15,23,42,0.6)",
            width: isMobile ? "100%" : "auto",
          }}
        >
          View Ticket History
        </button>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "12px",
          marginBottom: isMobile ? "18px" : "24px",
        }}
      >
        <StatCard
          label="Registered Machine Models"
          value={totalMachines}
          onClick={() => navigate("/machines/registered")}   
        />
        <StatCard
          label="Total Tickets"
          value={totalTickets}
          onClick={() => navigate("/tickets/history")}      
        />
        <StatCard
          label="Open Issues"
          value={openTickets}
          highlight
          onClick={() => navigate("/tickets/history")}      
        />
        <StatCard
          label="Resolved Tickets"
          value={completedTickets}
          onClick={() => navigate("/tickets/history")}       
        />

      </div>

      <Card
        style={{
          marginBottom: "18px",
          padding: "16px 18px",
          borderRadius: "16px",
          background: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(148,163,184,0.35)",
        }}
      >
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            gap: isMobile ? "10px" : "12px",
            width: "100%",
          }}
        >
          {/* Input Wrapper */}
          <div style={{ flex: 1 }}>
            <label
              htmlFor="serial-search"
              style={{
                fontSize: "0.8rem",
                opacity: 0.8,
                display: "block",
                marginBottom: "6px",
              }}
            >
              Search machine by serial number
            </label>

            <input
              id="serial-search"
              value={searchSerial}
              onChange={(e) => setSearchSerial(e.target.value)}
              placeholder="e.g. A4C-2024-0001"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(148,163,184,0.4)",
                background: "#0f172a",
                color: "white",
                fontSize: "0.9rem",
                outline: "none",
                height: "44px", 
              }}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            style={{
              padding: "12px 22px",
              borderRadius: "12px",
              border: "none",
              background:
                "linear-gradient(135deg, rgba(56,189,248,1), rgba(37,99,235,1))",
              color: "white",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: isMobile ? "0px" : "20px",
              marginLeft: isMobile ? "0px" : "30px",  
            }}
          >
            Search & Get Report
          </button>
        </form>

        {searchError && (
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.8rem",
              color: "#f97373",
            }}
          >
            {searchError}
          </p>
        )}
      </Card>

      {/* Main actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
          marginBottom: "18px",
        }}
      >
        <ActionCard
          title="Report Machine Issue"
          description="Select category, model and serial to raise a new issue with AI help."
          onClick={() => navigate("/categories")}
          badge="Most Used"
          emoji="➕"
        />

        <ActionCard
          title="Ticket History"
          description="See all past complaints, AI suggestions and technician notes."
          onClick={() => navigate("/tickets/history")}
          emoji="📜"
        />

        <ActionCard
          title="Ask AI Assistant"
          description="Describe a problem in simple language and let AI suggest causes."
          onClick={() => navigate("/ticket")}
          emoji="🤖"
        />

        <ActionCard
          title="AI Image Diagnosis"
          description="Upload a stitch or seam defect photo and see demo AI diagnosis."
          onClick={() => navigate("/ai/image-demo")}
          emoji="🖼"
        />
        <ActionCard
          title="Registered Machines"
          description="View all machines that your factory has registered in FM Support."
          onClick={() => navigate("/machines/registered")}
          emoji="🧵"
        />
      </div>

      {/* ---- Machine history report ---- */}
      {selectedMachine && (
        <Card
          style={{
            borderRadius: "18px",
            padding: "14px 16px",
            background:
              "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(22,101,52,0.9))",
            border: "1px solid rgba(34,197,94,0.7)",
          }}
        >
          <div
            style={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.8,
                  marginBottom: "2px",
                }}
              >
                Machine History Report
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {(selectedMachine as any).modelName ??
                  (selectedMachine as any).model ??
                  "Machine"}
              </div>
            </div>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "999px",
                background: "rgba(22,163,74,0.9)",
                color: "black",
                fontSize: "0.7rem",
                fontWeight: 600,
              }}
            >
              SERIAL:{" "}
              {String(
                (selectedMachine as any).serialNumber ??
                (selectedMachine as any).serial
              ).toUpperCase()}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "10px",
              marginBottom: "10px",
              fontSize: "0.85rem",
            }}
          >
            <div>
              <div style={{ opacity: 0.75 }}>Total Tickets</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                {machineHistory.length}
              </div>
            </div>
            <div>
              <div style={{ opacity: 0.75 }}>Open Tickets</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                {
                  machineHistory.filter(
                    (t) => (t as any).status === "OPEN"
                  ).length
                }
              </div>
            </div>
            <div>
              <div style={{ opacity: 0.75 }}>Completed Tickets</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                {
                  machineHistory.filter(
                    (t) => (t as any).status === "COMPLETED"
                  ).length
                }
              </div>
            </div>
          </div>

          {machineHistory.length > 0 ? (
            <div
              style={{
                marginTop: "6px",
                maxHeight: "220px",
                overflowY: "auto",
                borderTop: "1px solid rgba(148,163,184,0.3)",
                paddingTop: "8px",
              }}
            >
              {machineHistory.map((t) => {
                const anyTicket = t as any;
                const created = anyTicket.createdAt
                  ? new Date(anyTicket.createdAt).toLocaleString()
                  : null;
                return (
                  <div
                    key={anyTicket.id ?? anyTicket._id ?? Math.random()}
                    style={{
                      padding: "6px 0",
                      borderBottom:
                        "1px solid rgba(15,23,42,0.9)",
                      fontSize: "0.8rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "6px",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>
                        {anyTicket.title ?? "Service Ticket"}
                      </span>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          padding: "2px 8px",
                          borderRadius: "999px",
                          background:
                            anyTicket.status === "COMPLETED"
                              ? "rgba(22,163,74,0.9)"
                              : anyTicket.status === "OPEN"
                                ? "rgba(239,68,68,0.9)"
                                : "rgba(148,163,184,0.9)",
                          color: "black",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {anyTicket.status ?? "UNKNOWN"}
                      </span>
                    </div>
                    {created && (
                      <div style={{ opacity: 0.75 }}>{created}</div>
                    )}
                    {anyTicket.summary && (
                      <div
                        style={{
                          marginTop: "2px",
                          opacity: 0.85,
                          lineHeight: 1.3,
                        }}
                      >
                        {anyTicket.summary}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p
              style={{
                marginTop: "4px",
                fontSize: "0.8rem",
                opacity: 0.85,
              }}
            >
              No tickets found for this machine yet. This serial is registered
              but has no service history in FM Support.
            </p>
          )}
        </Card>
      )}
      {/* ---------------------------------- */}

      {loading && (
        <p
          style={{
            marginTop: "18px",
            fontSize: "0.85rem",
            opacity: 0.7,
          }}
        >
          Loading factory data…
        </p>
      )}
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  highlight?: boolean;
  onClick?: () => void;   
};

function StatCard({ label, value, highlight, onClick }: StatCardProps) {
  return (
    <Card
      onClick={onClick}
      style={{
        padding: "12px 14px",
        borderRadius: "16px",
        background: highlight
          ? "radial-gradient(circle at top left, #facc15, #0f172a 60%)"
          : "rgba(15,23,42,0.9)",
        border: highlight
          ? "1px solid rgba(250,204,21,0.7)"
          : "1px solid rgba(148,163,184,0.25)",
        cursor: onClick ? "pointer" : "default",   
      }}
    >
      <div style={{ fontSize: "0.8rem", opacity: 0.75, marginBottom: "4px" }}>
        {label}
      </div>
      <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>{value}</div>
    </Card>
  );
}


type ActionCardProps = {
  title: string;
  description: string;
  onClick: () => void;
  badge?: string;
  emoji?: string;
};

function ActionCard({
  title,
  description,
  onClick,
  badge,
  emoji,
}: ActionCardProps) {
  return (
    <Card
      onClick={onClick}
      style={{
        borderRadius: "18px",
        background:
          "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(30,64,175,0.9))",
      }}
    >
      {badge && (
        <span
          style={{
            display: "inline-block",
            marginBottom: "10px",
            padding: "3px 10px",
            borderRadius: "999px",
            background: "rgba(34,197,94,0.9)",
            color: "black",
            fontSize: "0.7rem",
            fontWeight: 600,
          }}
        >
          {badge}
        </span>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        {emoji && (
          <div style={{ fontSize: "1.4rem", marginTop: "2px" }}>{emoji}</div>
        )}
        <div>
          <div
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              opacity: 0.8,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </Card>
  );
}
