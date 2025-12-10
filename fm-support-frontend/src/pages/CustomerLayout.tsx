import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          borderBottom: "1px solid #1f2937",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#020617",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        {/* LEFT — LOGO */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "999px",
              background: "radial-gradient(circle at 30% 30%, #22c55e, #0f172a 70%)",
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
              <div style={{ fontSize: "1rem", fontWeight: 600 }}>FM Factory Support</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.6 }}>Jack — After Sales</div>
            </div>
          )}
        </div>

        {/* RIGHT — MOBILE HAMBURGER */}
        {isMobile ? (
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: "1.4rem",
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: "8px",
              background: menuOpen ? "#1f2937" : "transparent",
            }}
          >
            ☰
          </div>
        ) : (
          // Desktop tech mode
          <button
            onClick={() => navigate("/tech/dashboard")}
            style={{
              padding: "6px 12px",
              borderRadius: "999px",
              border: "1px solid #374151",
              background: "#020617",
              color: "white",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            Technician Mode
          </button>
        )}
      </header>

      {/* MOBILE MENU DRAWER */}
      {isMobile && (
        <div
          style={{
            background: "#0f172a",
            borderBottom: "1px solid #1f2937",
            padding: "14px",
            display: menuOpen ? "block" : "none",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <MobileNavItem to="/dashboard" label="Dashboard" onClick={() => setMenuOpen(false)} />
          <MobileNavItem to="/categories" label="Report Machine Issue" onClick={() => setMenuOpen(false)} />
          <MobileNavItem to="/tickets/history" label="Ticket History" onClick={() => setMenuOpen(false)} />
          <MobileNavItem to="/ticket" label="Ask AI Assistant" onClick={() => setMenuOpen(false)} />
          <MobileNavItem to="/ai/image-demo" label="AI Image Diagnosis" onClick={() => setMenuOpen(false)} />

          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #1f2937" }}>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/tech/dashboard");
              }}
              style={{
                width: "100%",
                padding: "10px 0",
                borderRadius: "8px",
                background: "#22c55e",
                border: "none",
                color: "black",
                fontWeight: 600,
                marginTop: "6px",
                fontSize: "0.85rem",
              }}
            >
              Technician Mode
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main style={{ padding: isMobile ? "14px" : "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}

function MobileNavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      style={({ isActive }) => ({
        display: "block",
        padding: "10px 0",
        color: isActive ? "#22c55e" : "white",
        fontSize: "0.9rem",
        textDecoration: "none",
      })}
    >
      {label}
    </NavLink>
  );
}
