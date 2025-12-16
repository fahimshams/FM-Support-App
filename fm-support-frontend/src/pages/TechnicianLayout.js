import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
export default function TechnicianLayout() {
    const navigate = useNavigate();
    const isMobile = useIsMobile(768);
    const [menuOpen, setMenuOpen] = useState(false);
    return (_jsxs("div", { style: {
            minHeight: "100vh",
            background: "#F5F7FA",
            color: "#1A1F36",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        }, children: [_jsxs("header", { style: {
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
                }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }, onClick: () => navigate("/tech/dashboard"), children: [_jsx("div", { style: {
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
                                }, children: "ZJ" }), !isMobile && (_jsxs("div", { children: [_jsx("div", { style: { fontSize: "1.1rem", fontWeight: 600, color: "#1A1F36" }, children: "Zoje Technician Console" }), _jsx("div", { style: { fontSize: "0.8rem", color: "#718096" }, children: "Service Team Dashboard \u2014 Bangladesh" })] }))] }), isMobile ? (_jsx("button", { onClick: () => setMenuOpen(!menuOpen), style: {
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
                        }, children: "\u2630" })) : (_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "16px" }, children: [_jsxs("nav", { style: { display: "flex", gap: "8px", fontSize: "0.875rem" }, children: [_jsx(TechNavItem, { to: "/tech/dashboard", label: "My Tickets" }), _jsx(TechNavItem, { to: "/tech/history", label: "Completed" }), _jsx(TechNavItem, { to: "/tech/ai-training", label: "AI Training" })] }), _jsx("button", { onClick: () => navigate("/dashboard"), style: {
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    background: "#FFFFFF",
                                    color: "#0066CC",
                                    border: "1px solid #E2E8F0",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }, onMouseEnter: (e) => {
                                    e.currentTarget.style.background = "#F5F7FA";
                                    e.currentTarget.style.borderColor = "#0066CC";
                                }, onMouseLeave: (e) => {
                                    e.currentTarget.style.background = "#FFFFFF";
                                    e.currentTarget.style.borderColor = "#E2E8F0";
                                }, children: "Back to Customer" })] }))] }), isMobile && (_jsxs("div", { style: {
                    background: "#FFFFFF",
                    borderBottom: "1px solid #E2E8F0",
                    padding: "16px",
                    display: menuOpen ? "block" : "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }, children: [_jsx(MobileTechNavItem, { to: "/tech/dashboard", label: "My Tickets", onClick: () => setMenuOpen(false) }), _jsx(MobileTechNavItem, { to: "/tech/history", label: "Completed", onClick: () => setMenuOpen(false) }), _jsx(MobileTechNavItem, { to: "/tech/ai-training", label: "AI Training", onClick: () => setMenuOpen(false) }), _jsx("div", { style: {
                            marginTop: 12,
                            paddingTop: 12,
                            borderTop: "1px solid #E2E8F0",
                        }, children: _jsx("button", { onClick: () => {
                                setMenuOpen(false);
                                navigate("/dashboard");
                            }, style: {
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                background: "#0066CC",
                                border: "none",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                cursor: "pointer",
                            }, children: "Back to Customer View" }) })] })), _jsx("main", { style: { padding: isMobile ? "16px" : "32px 24px", maxWidth: "1400px", margin: "0 auto" }, children: _jsx(Outlet, {}) })] }));
}
function TechNavItem({ to, label }) {
    return (_jsx(NavLink, { to: to, style: ({ isActive }) => ({
            padding: "8px 16px",
            borderRadius: "8px",
            textDecoration: "none",
            color: isActive ? "#0066CC" : "#4A5568",
            background: isActive ? "#E6F2FF" : "transparent",
            fontWeight: isActive ? 600 : 500,
            fontSize: "0.875rem",
            transition: "all 0.2s ease",
        }), children: label }));
}
function MobileTechNavItem({ to, label, onClick, }) {
    return (_jsx(NavLink, { to: to, onClick: onClick, style: ({ isActive }) => ({
            display: "block",
            padding: "12px 0",
            color: isActive ? "#0066CC" : "#4A5568",
            fontSize: "0.9rem",
            fontWeight: isActive ? 600 : 400,
            textDecoration: "none",
            borderLeft: isActive ? "3px solid #0066CC" : "3px solid transparent",
            paddingLeft: "12px",
            transition: "all 0.2s ease",
        }), children: label }));
}
//# sourceMappingURL=TechnicianLayout.js.map