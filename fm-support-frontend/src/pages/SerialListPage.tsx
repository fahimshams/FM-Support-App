import { useParams, useNavigate } from "react-router-dom";
import { modelsByCategory } from "../data/models";
import { generateSerials } from "../data/generateSerials";
import { spareParts } from "../data/spareParts";
import { useState } from "react";
import { resolveImageUrl } from "../utils/imageUtils";
import Card from "../components/Card";

export default function SerialListPage() {
  const { categoryId, modelId } = useParams();
  const navigate = useNavigate();

  const model = categoryId
    ? modelsByCategory[categoryId]?.find((m) => m.id === modelId)
    : null;

  const [serials] = useState(() => (modelId ? generateSerials(modelId) : []));

  if (!model || !modelId) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Card style={{ padding: "32px", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "8px", color: "#1A1F36", fontWeight: 600 }}>
            Invalid Machine Model
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#718096" }}>
            Please select a valid machine model.
          </p>
        </Card>
      </div>
    );
  }

  const parts = spareParts[modelId] ?? [];
  const imageUrl = resolveImageUrl((model as any).image);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "8px", color: "#1A1F36", fontWeight: 600 }}>
          {model.name}
        </h2>
        <p style={{ fontSize: "0.95rem", color: "#718096" }}>Factory Inventory</p>
      </div>

      {serials.map((s: any, idx: number) => (
        <Card key={idx} style={{ marginBottom: "16px", padding: "24px" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {imageUrl && (
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "8px",
                  background: "#F5F7FA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "1px solid #E2E8F0",
                  flexShrink: 0,
                }}
              >
                <img
                  src={imageUrl}
                  alt={model.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            <div style={{ flex: 1, minWidth: "200px" }}>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: "12px",
                  color: "#1A1F36",
                }}
              >
                Serial: <span style={{ color: "#0066CC" }}>{s.serial}</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }}>
                    Purchase Date
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 500, color: "#1A1F36" }}>
                    {s.purchaseDate}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }}>
                    Warranty Expiry
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 500, color: "#1A1F36" }}>
                    {s.expiryDate}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }}>
                    Warranty Status
                  </div>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: s.active ? "#059669" : "#DC2626",
                    }}
                  >
                    {s.active ? "Active" : "Expired"}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: "0.875rem", color: "#4A5568", marginBottom: "12px" }}>
                <strong>Coverage:</strong> {s.coverage}
              </div>

              <details
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "16px",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#F5F7FA",
                  border: "1px solid #E2E8F0",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    color: "#1A1F36",
                    marginBottom: "8px",
                  }}
                >
                  Spare Parts (BDT)
                </summary>
                <ul style={{ marginTop: "8px", paddingLeft: "20px", color: "#4A5568" }}>
                  {parts.map((p: any, i: number) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      {p.name} — <strong style={{ color: "#0066CC" }}>৳{p.price * 110}</strong> (approx)
                    </li>
                  ))}
                </ul>
              </details>

              <button
                onClick={() =>
                  navigate("/ticket", {
                    state: {
                      modelId,
                      serial: s.serial,
                      machineImage: imageUrl,
                    },
                  })
                }
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
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0066CC";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Report Issue
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
