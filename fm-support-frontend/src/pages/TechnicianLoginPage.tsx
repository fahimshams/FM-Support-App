import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TechnicianLoginPage() {
  const [techName, setTechName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!techName.trim()) return;
    navigate("/tech/dashboard", { state: { techName } });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          background: "#0F172A",
          padding: "24px",
          borderRadius: "12px",
          width: "340px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "1px solid #1f2937",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "16px",
            fontSize: "1.4rem",
          }}
        >
          Technician Login
        </h2>

        <input
          value={techName}
          onChange={(e) => setTechName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#020617",
            color: "white",
            marginBottom: "16px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "999px",
            border: "none",
            background: "#22c55e",
            color: "black",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
