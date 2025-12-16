import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateTicket } from "../api";
import Card from "../components/Card";

export default function TechnicianTicketPage() {
  const navigate = useNavigate();
  const location = useLocation() as {
    state?: { ticket?: any; techName?: string };
  };

  const [ticket, setTicket] = useState<any | null>(location.state?.ticket || null);
  const techName = location.state?.techName || "Technician";

  const [status, setStatus] = useState<string>(ticket?.status || "OPEN");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  if (!ticket) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Card style={{ padding: "32px", textAlign: "center" }}>
          <p style={{ fontSize: "0.95rem", color: "#718096", marginBottom: "20px" }}>
            No ticket data. Please open from Technician Dashboard.
          </p>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#0066CC",
              color: "white",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0052A3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0066CC";
            }}
          >
            Back
          </button>
        </Card>
      </div>
    );
  }

  async function handleSave() {
    try {
      setSaving(true);
      const res = await updateTicket(ticket.id, {
        status,
        technicianId: "tech1",
        note: note || undefined,
      });
      setTicket(res.ticket);
      setNote("");
      alert("Ticket updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update ticket");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "1px solid #E2E8F0",
          background: "#FFFFFF",
          color: "#4A5568",
          fontSize: "0.875rem",
          fontWeight: 500,
          cursor: "pointer",
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
        ← Back
      </button>

      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "8px", color: "#1A1F36", fontWeight: 600 }}>
          Ticket Detail – {ticket.id}
        </h1>
        <p style={{ fontSize: "0.95rem", color: "#718096" }}>Technician: {techName}</p>
      </div>

      {/* Ticket Info Card */}
      <Card style={{ marginBottom: "24px", padding: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }}>
              Machine ID
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 500, color: "#1A1F36" }}>
              {ticket.machineId}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }}>
              Issue Type
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 500, color: "#1A1F36" }}>
              {ticket.issueType.replace(/_/g, " ")}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }}>
              Status
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 500, color: "#1A1F36" }}>
              {ticket.status}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }}>
              Created
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 500, color: "#1A1F36" }}>
              {new Date(ticket.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "8px" }}>
            Description
          </div>
          <div
            style={{
              fontSize: "1rem",
              color: "#1A1F36",
              lineHeight: 1.6,
              padding: "12px",
              background: "#F5F7FA",
              borderRadius: "8px",
            }}
          >
            {ticket.description}
          </div>
        </div>

        {ticket.aiSuggestion && (
          <Card
            style={{
              padding: "20px",
              background: "#E6F2FF",
              border: "1px solid #B3D9FF",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "#0066CC",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                AI
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "#1A1F36" }}>
                AI Suggestion
              </div>
            </div>
            <div
              style={{
                fontSize: "0.95rem",
                color: "#1A1F36",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                marginBottom: "12px",
              }}
            >
              {ticket.aiSuggestion.text}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#4A5568",
                paddingTop: "12px",
                borderTop: "1px solid #B3D9FF",
              }}
            >
              From cache: {ticket.aiSuggestion.fromCache ? "Yes" : "No"} · Credits used:{" "}
              {ticket.aiSuggestion.creditsUsed}
            </div>
          </Card>
        )}
      </Card>

      {/* Update Form Card */}
      <Card style={{ padding: "24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#1A1F36",
            }}
          >
            Update Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
              color: "#1A1F36",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#0066CC";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 102, 204, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#1A1F36",
            }}
          >
            Add Technician Note
          </label>
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="E.g., Adjusted needle bar height, cleaned hook, test stitched at 4000 RPM."
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
              color: "#1A1F36",
              resize: "vertical",
              fontSize: "0.9rem",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#0066CC";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 102, 204, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            width: "100%",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: saving ? "#CBD5E0" : "#00A651",
            color: "white",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: saving ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!saving) {
              e.currentTarget.style.background = "#059669";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!saving) {
              e.currentTarget.style.background = "#00A651";
              e.currentTarget.style.transform = "translateY(0)";
            }
          }}
        >
          {saving ? "Saving…" : "Save Update"}
        </button>

        {ticket.technicianNotes && ticket.technicianNotes.length > 0 && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              borderRadius: "8px",
              background: "#F5F7FA",
              border: "1px solid #E2E8F0",
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#1A1F36",
                marginBottom: "12px",
              }}
            >
              Previous Notes:
            </div>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "0.875rem", color: "#4A5568" }}>
              {ticket.technicianNotes.map((n: string, idx: number) => (
                <li key={idx} style={{ marginBottom: "8px", lineHeight: 1.5 }}>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}
