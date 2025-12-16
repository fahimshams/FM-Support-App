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
        background: "#F5F7FA",
        color: "#1A1F36",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          borderBottom: "1px solid #E2E8F0",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#FFFFFF",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Left: Logo / Title */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
          onClick={() => navigate("/tech/dashboard")}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0052A3 0%, #0066CC 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              fontWeight: 700,
              color: "white",
              boxShadow: "0 2px 4px rgba(0, 82, 163, 0.2)",
            }}
          >
            ZJ
          </div>
          {!isMobile && (
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1A1F36" }}>
                Zoje Technician Console
              </div>
              <div style={{ fontSize: "0.8rem", color: "#718096" }}>
                Service Team Dashboard — Bangladesh
              </div>
            </div>
          )}
        </div>

        {/* Right: Desktop nav + button OR Mobile hamburger */}
        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              border: "none",
              background: menuOpen ? "#E8ECF1" : "transparent",
              color: "#1A1F36",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ☰
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <nav style={{ display: "flex", gap: "8px", fontSize: "0.875rem" }}>
              <TechNavItem to="/tech/dashboard" label="My Tickets" />
              <TechNavItem to="/tech/history" label="Completed" />
              <TechNavItem to="/tech/ai-training" label="AI Training" />
            </nav>

            <button
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                background: "#FFFFFF",
                color: "#0066CC",
                border: "1px solid #E2E8F0",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F7FA";
                e.currentTarget.style.borderColor = "#0066CC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.borderColor = "#E2E8F0";
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
            background: "#FFFFFF",
            borderBottom: "1px solid #E2E8F0",
            padding: "16px",
            display: menuOpen ? "block" : "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
          <MobileTechNavItem
            to="/tech/ai-training"
            label="AI Training"
            onClick={() => setMenuOpen(false)}
          />

          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: "1px solid #E2E8F0",
            }}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/dashboard");
              }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: "#0066CC",
                border: "none",
                color: "white",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Back to Customer View
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main style={{ padding: isMobile ? "16px" : "32px 24px", maxWidth: "1400px", margin: "0 auto" }}>
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
        padding: "8px 16px",
        borderRadius: "8px",
        textDecoration: "none",
        color: isActive ? "#0066CC" : "#4A5568",
        background: isActive ? "#E6F2FF" : "transparent",
        fontWeight: isActive ? 600 : 500,
        fontSize: "0.875rem",
        transition: "all 0.2s ease",
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
        padding: "12px 0",
        color: isActive ? "#0066CC" : "#4A5568",
        fontSize: "0.9rem",
        fontWeight: isActive ? 600 : 400,
        textDecoration: "none",
        borderLeft: isActive ? "3px solid #0066CC" : "3px solid transparent",
        paddingLeft: "12px",
        transition: "all 0.2s ease",
      })}
    >
      {label}
    </NavLink>
  );
}
