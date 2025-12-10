import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateTicket } from "../api";

export default function TechnicianTicketPage() {
  const navigate = useNavigate();
  const location = useLocation() as {
    state?: { ticket?: any; techName?: string };
  };

  const [ticket, setTicket] = useState<any | null>(
    location.state?.ticket || null
  );
  const techName = location.state?.techName || "Technician";

  const [status, setStatus] = useState<string>(ticket?.status || "OPEN");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  if (!ticket) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <p>No ticket data. Please open from Technician Dashboard.</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "8px",
            padding: "6px 12px",
            borderRadius: "999px",
            border: "none",
            background: "#3b82f6",
            color: "white",
            cursor: "pointer",
          }}
        >
          Back
        </button>
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
      alert("Ticket updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update ticket");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "12px",
          padding: "6px 12px",
          borderRadius: "999px",
          border: "none",
          background: "#111827",
          color: "white",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>
        Ticket Detail – {ticket.id}
      </h1>
      <p style={{ fontSize: "0.85rem", opacity: 0.8, marginBottom: "12px" }}>
        Technician: {techName}
      </p>

      <div
        style={{
          background: "#0F172A",
          borderRadius: "10px",
          padding: "16px",
          border: "1px solid #1f2937",
          marginBottom: "16px",
        }}
      >
        <div style={{ marginBottom: "6px" }}>
          <strong>Machine:</strong> {ticket.machineId}
        </div>
        <div style={{ marginBottom: "6px" }}>
          <strong>Issue Type:</strong> {ticket.issueType}
        </div>
        <div style={{ marginBottom: "6px" }}>
          <strong>Description:</strong> {ticket.description}
        </div>
        <div style={{ marginBottom: "6px" }}>
          <strong>Status:</strong> {ticket.status}
        </div>
        <div style={{ marginBottom: "6px", fontSize: "0.85rem", opacity: 0.8 }}>
          <strong>Created:</strong>{" "}
          {new Date(ticket.createdAt).toLocaleString()}
        </div>

        {ticket.aiSuggestion && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px",
              borderRadius: "8px",
              background: "#020617",
              border: "1px dashed #374151",
              whiteSpace: "pre-wrap",
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              AI Suggestion
            </div>
            <div style={{ fontSize: "0.9rem" }}>
              {ticket.aiSuggestion.text}
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "4px" }}>
              From cache: {ticket.aiSuggestion.fromCache ? "Yes" : "No"} ·
              Credits used: {ticket.aiSuggestion.creditsUsed}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          background: "#0F172A",
          borderRadius: "10px",
          padding: "16px",
          border: "1px solid #1f2937",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ display: "block", marginBottom: "4px", fontSize: "0.9rem" }}
          >
            Update Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #374151",
              background: "#020617",
              color: "white",
            }}
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ display: "block", marginBottom: "4px", fontSize: "0.9rem" }}
          >
            Add Technician Note
          </label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="E.g., Adjusted needle bar height, cleaned hook, test stitched at 4000 RPM."
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #374151",
              background: "#020617",
              color: "white",
              resize: "vertical",
            }}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "8px 14px",
            borderRadius: "999px",
            border: "none",
            background: saving ? "#4b5563" : "#22c55e",
            color: "black",
            fontWeight: 600,
            cursor: saving ? "wait" : "pointer",
          }}
        >
          {saving ? "Saving…" : "Save Update"}
        </button>

        {ticket.technicianNotes && ticket.technicianNotes.length > 0 && (
          <div style={{ marginTop: "12px", fontSize: "0.85rem" }}>
            <strong>Previous Notes:</strong>
            <ul style={{ paddingLeft: "18px", marginTop: "4px" }}>
              {ticket.technicianNotes.map((n: string, idx: number) => (
                <li key={idx} style={{ marginBottom: "2px" }}>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
