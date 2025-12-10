import { useParams, useNavigate } from "react-router-dom";
import { modelsByCategory } from "../data/models";
import { generateSerials } from "../data/generateSerials";
import { spareParts } from "../data/spareParts";
import { useState } from "react";
import { BASE_URL } from "../api"; 

// normalize image URL so it works on mobile
function resolveModelImage(image: string | undefined): string {
  if (!image) return "";

  // If image is already using localhost backend, swap base
  if (image.startsWith("http://localhost:4000") || image.startsWith("http://127.0.0.1:4000")) {
    return image.replace(/^http:\/\/(localhost|127\.0\.0\.1):4000/, BASE_URL);
  }

  // If it's a backend relative path like "/public/zoje.png"
  if (image.startsWith("/public")) {
    return `${BASE_URL}${image}`;
  }

  // If it's a plain relative path (e.g. "/images/zoje.png" served by frontend),
  // keep as-is, it will be resolved by Vite from 192.168.68.104:5173
  return image;
}

export default function SerialListPage() {
  const { categoryId, modelId } = useParams();
  const navigate = useNavigate();

  const model = categoryId
    ? modelsByCategory[categoryId]?.find((m) => m.id === modelId)
    : null;

  const [serials] = useState(() => (modelId ? generateSerials(modelId) : []));

  if (!model || !modelId) {
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
        Invalid machine model.
      </div>
    );
  }

  const parts = spareParts[modelId] ?? [];
  const imageUrl = resolveModelImage((model as any).image); 

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
      <h2 style={{ fontSize: "1.4rem", marginBottom: "16px" }}>
        {model.name} — Factory Inventory
      </h2>

      {serials.map((s: any, idx: number) => (
        <div
          key={idx}
          style={{
            borderRadius: "12px",
            border: "1px solid #1f2937",
            background: "#020617",
            padding: "16px",
            marginBottom: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            display: "flex",
            gap: "16px",
          }}
        >
          <img
            src={imageUrl}
            alt={model.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Serial: {s.serial}
            </div>

            <div style={{ fontSize: "0.9rem", marginBottom: "4px" }}>
              <strong>Purchase:</strong> {s.purchaseDate}
            </div>
            <div style={{ fontSize: "0.9rem", marginBottom: "4px" }}>
              <strong>Warranty Expiry:</strong> {s.expiryDate}
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                marginBottom: "6px",
                color: s.active ? "#22c55e" : "#f97373",
                fontWeight: 600,
              }}
            >
              Warranty: {s.active ? "Active" : "Expired"}
            </div>
            <div style={{ fontSize: "0.9rem", marginBottom: "8px" }}>
              <strong>Coverage:</strong> {s.coverage}
            </div>

            <details style={{ fontSize: "0.9rem", marginBottom: "8px" }}>
              <summary style={{ cursor: "pointer" }}>
                Spare Parts (USD)
              </summary>
              <ul style={{ marginTop: "6px", paddingLeft: "20px" }}>
                {parts.map((p: any, i: number) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {p.name} — <strong>${p.price}</strong>
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
                marginTop: "4px",
                padding: "8px 14px",
                borderRadius: "999px",
                border: "none",
                background: "#3b82f6",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Report Issue
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
