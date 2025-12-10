import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          background: "#020617",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          width: "320px",
          textAlign: "center",
          border: "1px solid #1f2937",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
          FM Support Portal
        </h1>

        <input
          type="text"
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
            background: "#3b82f6",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
