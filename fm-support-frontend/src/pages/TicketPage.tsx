// src/pages/TicketPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createTicket } from "../api";

type IssueType = "THREAD_BREAKING" | "STITCH_SKIPPING" | "FABRIC_NOT_FEEDING";

type TicketLocationState = {
  modelId?: string;
  serial?: string;
  machineImage?: string;
};

export default function TicketPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { modelId, serial, machineImage } = (location.state || {}) as TicketLocationState;

  const [issueType, setIssueType] = useState<IssueType>("THREAD_BREAKING");
  const [description, setDescription] = useState("");
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    try {
      setSubmitting(true);
      setError(null);
      setAiResult(null);

      // For demo i send machineId "m1" (backend expects existing machine)
      const payload = {
        machineId: "m1",
        createdByUserId: "u1",
        issueType,
        description: `[Model: ${modelId}, Serial: ${serial}] ${description}`,
      };

      const res = await createTicket(payload);
      setAiResult(res.ticket.aiSuggestion);
    } catch (err: any) {
      console.error(err);
      setError("Failed to create ticket or call AI.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!modelId || !serial) {
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
        <h2 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
          Missing machine information
        </h2>
        <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "12px" }}>
          Please select a machine again and then report an issue.
        </p>
        <button
          onClick={() => navigate("/categories")}
          style={{
            padding: "8px 16px",
            borderRadius: "999px",
            border: "none",
            background: "#22c55e",
            color: "black",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          Back to Report Machine Issue
        </button>
      </div>
    );
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
      {/* Header row: title + AI image demo button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ fontSize: "1.4rem" }}>Report Issue</h2>

        <button
          onClick={() => navigate("/ai/image-demo")}
          style={{
            padding: "6px 12px",
            borderRadius: "999px",
            border: "none",
            background: "#22c55e",
            color: "black",
            fontSize: "0.85rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Try AI Image Diagnosis (Demo)
        </button>
      </div>

      {/* Machine info */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "16px",
          alignItems: "center",
        }}
      >
        {machineImage && (
          <img
            src={machineImage}
            alt={modelId}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              borderRadius: "8px",
              border: "1px solid #1f2937",
              background: "#020617",
            }}
          />
        )}
        <div>
          <div style={{ marginBottom: "4px", fontSize: "0.95rem" }}>
            <strong>Model:</strong> {modelId}
          </div>
          <div style={{ marginBottom: "4px", fontSize: "0.95rem" }}>
            <strong>Serial:</strong> {serial}
          </div>
        </div>
      </div>

      {/* Issue type */}
      <div style={{ marginBottom: "12px" }}>
        <label
          style={{ display: "block", marginBottom: "4px", fontSize: "0.95rem" }}
        >
          Issue Type
        </label>
        <select
          value={issueType}
          onChange={(e) => setIssueType(e.target.value as IssueType)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#020617",
            color: "white",
            fontSize: "0.9rem",
          }}
        >
          <option value="THREAD_BREAKING">Thread breaking</option>
          <option value="STITCH_SKIPPING">Stitch skipping</option>
          <option value="FABRIC_NOT_FEEDING">Fabric not feeding</option>
        </select>
      </div>

      {/* Description */}
      <div style={{ marginBottom: "12px" }}>
        <label
          style={{ display: "block", marginBottom: "4px", fontSize: "0.95rem" }}
        >
          Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#020617",
            color: "white",
            resize: "vertical",
            fontSize: "0.9rem",
          }}
          placeholder="Example: Thread breaking at high speed on Lycra..."
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={submitting || !description.trim()}
        style={{
          padding: "8px 16px",
          borderRadius: "999px",
          border: "none",
          background: submitting ? "#4b5563" : "#22c55e",
          color: "black",
          fontWeight: 600,
          fontSize: "0.9rem",
          cursor: submitting || !description.trim() ? "default" : "pointer",
          opacity: submitting || !description.trim() ? 0.7 : 1,
        }}
      >
        {submitting ? "Submitting..." : "Submit Ticket & Ask AI"}
      </button>

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: "8px",
            color: "#f97373",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </div>
      )}

      {/* AI result */}
      {aiResult && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            borderRadius: "10px",
            background: "#020617",
            border: "1px dashed #374151",
            whiteSpace: "pre-wrap",
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            AI Suggestion
          </div>
          <div style={{ fontSize: "0.9rem", marginBottom: "6px" }}>
            {aiResult.text}
          </div>
          <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
            From cache: {aiResult.fromCache ? "Yes (free)" : "No"}
            {" · "}
            Credits used: {aiResult.creditsUsed}
          </div>
        </div>
      )}
    </div>
  );
}
