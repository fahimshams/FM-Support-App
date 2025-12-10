import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function TechnicianLayout() {
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          borderBottom: "1px solid #1e293b",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0f172a",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        {/* Left: Logo / Title */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          onClick={() => navigate("/tech/dashboard")}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 30%, #3b82f6, #0f172a 70%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            FM
          </div>
          {!isMobile && (
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                Technician Console
              </div>
              <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>
                Internal Service Panel
              </div>
            </div>
          )}
        </div>

        {/* Right: Desktop nav + button OR Mobile hamburger */}
        {isMobile ? (
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: "1.4rem",
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: "8px",
              background: menuOpen ? "#1e293b" : "transparent",
            }}
          >
            ☰
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <nav style={{ display: "flex", gap: "12px", fontSize: "0.85rem" }}>
              <TechNavItem to="/tech/dashboard" label="My Tickets" />
              <TechNavItem to="/tech/history" label="Completed" />
            </nav>

            <button
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "6px 10px",
                borderRadius: "999px",
                background: "#1e293b",
                color: "white",
                border: "1px solid #334155",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Back to Customer
            </button>
          </div>
        )}
      </header>

      {/* Mobile menu drawer */}
      {isMobile && (
        <div
          style={{
            background: "#020617",
            borderBottom: "1px solid #1e293b",
            padding: "12px 16px",
            display: menuOpen ? "block" : "none",
          }}
        >
          <MobileTechNavItem
            to="/tech/dashboard"
            label="My Tickets"
            onClick={() => setMenuOpen(false)}
          />
          <MobileTechNavItem
            to="/tech/history"
            label="Completed"
            onClick={() => setMenuOpen(false)}
          />

          <div
            style={{
              marginTop: 10,
              paddingTop: 10,
              borderTop: "1px solid #1e293b",
            }}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/dashboard");
              }}
              style={{
                width: "100%",
                padding: "10px 0",
                borderRadius: "8px",
                background: "#22c55e",
                border: "none",
                color: "black",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              Back to Customer View
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main style={{ padding: isMobile ? "14px" : "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}

function TechNavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: "6px 10px",
        borderRadius: "999px",
        textDecoration: "none",
        color: "white",
        background: isActive ? "#1e293b" : "transparent",
        border: isActive ? "1px solid #3b82f6" : "1px solid transparent",
        fontWeight: isActive ? 600 : 400,
        fontSize: "0.85rem",
      })}
    >
      {label}
    </NavLink>
  );
}

function MobileTechNavItem({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      style={({ isActive }) => ({
        display: "block",
        padding: "10px 0",
        color: isActive ? "#3b82f6" : "white",
        fontSize: "0.9rem",
        textDecoration: "none",
      })}
    >
      {label}
    </NavLink>
  );
}
