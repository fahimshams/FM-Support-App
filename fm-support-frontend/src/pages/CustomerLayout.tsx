import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import zojeLogo from "../assets/zoje_logo.png";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="customer-layout">
      {/* HEADER */}
      <header className="support-header">
        {/* LEFT — LOGO */}
        <div className="header-logo" onClick={() => navigate("/dashboard")}>
          <img src={zojeLogo} alt="Zoje Machineries" className="logo-image" />
          {!isMobile && (
            <div className="logo-text">
              <div className="logo-title">Zoje Machineries Support</div>
              <div className="logo-subtitle">After-Sales Service Portal — Bangladesh</div>
            </div>
          )}
        </div>

        {/* RIGHT — NAVIGATION */}
        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`mobile-menu-button ${menuOpen ? "active" : ""}`}
          >
            ☰
          </button>
        ) : (
          <div className="header-nav-wrapper">
            <nav className="desktop-nav">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </NavLink>
              <NavLink
                to="/machines/registered"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">🏭</span>
                My Machines
              </NavLink>
              <NavLink
                to="/tickets/history"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">🎫</span>
                Tickets
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">📞</span>
                Contact
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">👤</span>
                Profile
              </NavLink>
              <NavLink
                to="/ai/assistant"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">🤖</span>
                Quick Help
              </NavLink>
            </nav>
            <button
              onClick={() => navigate("/tech/dashboard")}
              className="secondary-button"
            >
              Technician Mode
            </button>
          </div>
        )}
      </header>

      {/* MOBILE MENU DRAWER */}
      {isMobile && (
        <div className={`mobile-menu-drawer ${menuOpen ? "open" : ""}`}>
          <MobileNavItem to="/dashboard" label="Dashboard" onClick={() => setMenuOpen(false)} />
          <MobileNavItem to="/machines/registered" label="View My Machines" onClick={() => setMenuOpen(false)} />
          <MobileNavItem to="/tickets/history" label="My Support Tickets" onClick={() => setMenuOpen(false)} />
          <MobileNavItem to="/contact" label="Contact Support" onClick={() => setMenuOpen(false)} />
          <MobileNavItem to="/profile" label="Profile & Company Info" onClick={() => setMenuOpen(false)} />

          <div className="mobile-menu-footer">
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/tech/dashboard");
              }}
              className="primary-button"
              style={{ width: "100%" }}
            >
              Technician Mode
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function MobileNavItem({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}
    >
      {label}
    </NavLink>
  );
}
