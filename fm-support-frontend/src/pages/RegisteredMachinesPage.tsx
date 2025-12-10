// src/pages/RegisteredMachinesPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMachines } from "../api";
import Card from "../components/Card";

type AnyMachine = any; 

export default function RegisteredMachinesPage() {
  const [machines, setMachines] = useState<AnyMachine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchMachines();
        setMachines(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load machines", err);
        setError("Failed to load machines");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.3rem", marginBottom: 4 }}>
            Registered Machines
          </h1>
          <p style={{ fontSize: "0.85rem", opacity: 0.75 }}>
            All machines currently registered under this factory account.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
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

      {loading && (
        <p style={{ fontSize: "0.85rem", opacity: 0.75 }}>
          Loading machines…
        </p>
      )}
      {error && (
        <p style={{ fontSize: "0.85rem", color: "#f97373" }}>{error}</p>
      )}

      {!loading && !error && machines.length === 0 && (
        <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
          No machines registered yet.
        </p>
      )}

      {/* Machines grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 14,
          marginTop: 10,
        }}
      >
        {machines.map((m, i) => (
          <Card
            key={m.id ?? i}
            style={{
              borderRadius: 16,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {/*  machine image field */}
            {m.imageUrl && (
              <img
                src={m.imageUrl}
                alt={m.modelId || m.name || m.id}
                style={{
                  width: "100%",
                  height: 120,
                  objectFit: "contain",
                  borderRadius: 10,
                  marginBottom: 8,
                  background: "#020617",
                  border: "1px solid #1f2937",
                }}
              />
            )}

            <div
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              {m.displayName || m.modelId || m.name || `Machine ${i + 1}`}
            </div>

            {m.serial && (
              <div
                style={{
                  fontSize: "0.85rem",
                  opacity: 0.8,
                }}
              >
                Serial: {m.serial}
              </div>
            )}

            {m.category && (
              <div
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.75,
                }}
              >
                Category: {m.category}
              </div>
            )}

            {Array.isArray(m.serials) && (
              <div
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.75,
                }}
              >
                Serials registered: {m.serials.length}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
