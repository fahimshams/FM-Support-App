import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/TechnicianDashboardPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTickets } from "../api";
import Card from "../components/Card";
import { useIsMobile } from "../hooks/useIsMobile";
export default function TechnicianDashboardPage() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const isMobile = useIsMobile(768);
    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const data = await fetchTickets();
                setTickets(data);
                setError(null);
            }
            catch (err) {
                console.error("Failed to load tickets", err);
                setError("Failed to load tickets");
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, []);
    const openTickets = tickets.filter((t) => t.status === "OPEN");
    const inProgressTickets = tickets.filter((t) => t.status === "IN_PROGRESS");
    const completedTickets = tickets.filter((t) => t.status === "COMPLETED");
    return (_jsxs("div", { children: [_jsxs("div", { style: {
                    marginBottom: isMobile ? "20px" : "24px",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    justifyContent: "space-between",
                    gap: "16px",
                }, children: [_jsxs("div", { children: [_jsx("h1", { style: {
                                    fontSize: isMobile ? "1.5rem" : "1.75rem",
                                    marginBottom: "8px",
                                    color: "#1A1F36",
                                    fontWeight: 600,
                                }, children: "Zoje Technician Dashboard" }), _jsx("p", { style: { fontSize: "0.95rem", color: "#718096" }, children: "Manage all service tickets and machine issues in Bangladesh." })] }), _jsx("button", { onClick: () => navigate("/dashboard"), style: {
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "1px solid #E2E8F0",
                            background: "#FFFFFF",
                            color: "#4A5568",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            width: isMobile ? "100%" : "auto",
                            transition: "all 0.2s ease",
                        }, onMouseEnter: (e) => {
                            e.currentTarget.style.background = "#F5F7FA";
                            e.currentTarget.style.borderColor = "#CBD5E0";
                        }, onMouseLeave: (e) => {
                            e.currentTarget.style.background = "#FFFFFF";
                            e.currentTarget.style.borderColor = "#E2E8F0";
                        }, children: "\u2190 Back to Customer View" })] }), _jsxs("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "16px",
                    marginBottom: "24px",
                }, children: [_jsxs(Card, { style: { padding: "20px" }, children: [_jsx("div", { style: {
                                    fontSize: "0.875rem",
                                    color: "#718096",
                                    marginBottom: "8px",
                                    fontWeight: 500,
                                }, children: "Open Tickets" }), _jsx("div", { style: { fontSize: "2rem", fontWeight: 700, color: "#DC2626" }, children: openTickets.length })] }), _jsxs(Card, { style: { padding: "20px" }, children: [_jsx("div", { style: {
                                    fontSize: "0.875rem",
                                    color: "#718096",
                                    marginBottom: "8px",
                                    fontWeight: 500,
                                }, children: "In Progress" }), _jsx("div", { style: { fontSize: "2rem", fontWeight: 700, color: "#D97706" }, children: inProgressTickets.length })] }), _jsxs(Card, { style: { padding: "20px" }, children: [_jsx("div", { style: {
                                    fontSize: "0.875rem",
                                    color: "#718096",
                                    marginBottom: "8px",
                                    fontWeight: 500,
                                }, children: "Completed" }), _jsx("div", { style: { fontSize: "2rem", fontWeight: 700, color: "#059669" }, children: completedTickets.length })] })] }), loading && (_jsx(Card, { style: { padding: "40px", textAlign: "center" }, children: _jsx("p", { style: { fontSize: "0.95rem", color: "#718096" }, children: "Loading tickets\u2026" }) })), error && (_jsx(Card, { style: {
                    padding: "20px",
                    background: "#FEE2E2",
                    border: "1px solid #FCA5A5",
                    color: "#DC2626",
                }, children: error })), !loading && (_jsxs("div", { style: {
                    display: "grid",
                    gridTemplateColumns: isMobile
                        ? "minmax(0, 1fr)"
                        : "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                }, children: [_jsxs("div", { children: [_jsx("h2", { style: {
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    color: "#1A1F36",
                                    marginBottom: "12px",
                                }, children: "Open" }), openTickets.length === 0 && (_jsx(Card, { style: { padding: "20px", textAlign: "center" }, children: _jsx("p", { style: { fontSize: "0.875rem", color: "#718096" }, children: "No open tickets." }) })), openTickets.map((t) => (_jsx(TicketCard, { ticket: t, onClick: () => navigate(`/tech/tickets/${t.id}`) }, t.id)))] }), _jsxs("div", { children: [_jsx("h2", { style: {
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    color: "#1A1F36",
                                    marginBottom: "12px",
                                }, children: "In Progress" }), inProgressTickets.length === 0 && (_jsx(Card, { style: { padding: "20px", textAlign: "center" }, children: _jsx("p", { style: { fontSize: "0.875rem", color: "#718096" }, children: "No tickets in progress." }) })), inProgressTickets.map((t) => (_jsx(TicketCard, { ticket: t, onClick: () => navigate(`/tech/tickets/${t.id}`) }, t.id)))] }), _jsxs("div", { children: [_jsx("h2", { style: {
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    color: "#1A1F36",
                                    marginBottom: "12px",
                                }, children: "Completed" }), completedTickets.length === 0 && (_jsx(Card, { style: { padding: "20px", textAlign: "center" }, children: _jsx("p", { style: { fontSize: "0.875rem", color: "#718096" }, children: "No completed tickets yet." }) })), completedTickets.map((t) => (_jsx(TicketCard, { ticket: t, onClick: () => navigate(`/tech/tickets/${t.id}`) }, t.id)))] })] }))] }));
}
function TicketCard({ ticket, onClick, }) {
    return (_jsxs(Card, { onClick: onClick, style: {
            marginBottom: "12px",
            padding: "20px",
        }, children: [_jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                    marginBottom: "12px",
                }, children: [_jsxs("span", { style: {
                            fontSize: "0.75rem",
                            color: "#718096",
                            fontWeight: 500,
                        }, children: ["#", ticket.id] }), _jsx(StatusPill, { status: ticket.status })] }), _jsx("div", { style: {
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#1A1F36",
                    marginBottom: "8px",
                    lineHeight: 1.5,
                }, children: ticket.description }), _jsxs("div", { style: {
                    fontSize: "0.875rem",
                    color: "#718096",
                    marginBottom: "8px",
                }, children: ["Machine: ", ticket.machineId, " \u00B7 ", ticket.issueType.replace(/_/g, " ")] }), _jsx("div", { style: {
                    fontSize: "0.75rem",
                    color: "#CBD5E0",
                }, children: new Date(ticket.createdAt).toLocaleString() }), ticket.aiSuggestion && (_jsxs(Card, { style: {
                    marginTop: "12px",
                    padding: "12px",
                    background: "#E6F2FF",
                    border: "1px solid #B3D9FF",
                }, children: [_jsxs("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "6px",
                        }, children: [_jsx("div", { style: {
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "4px",
                                    background: "#0066CC",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                }, children: "AI" }), _jsx("span", { style: { fontSize: "0.8rem", fontWeight: 600, color: "#1A1F36" }, children: "Suggestion" })] }), _jsx("div", { style: {
                            fontSize: "0.8rem",
                            color: "#1A1F36",
                            lineHeight: 1.5,
                            whiteSpace: "pre-wrap",
                        }, children: ticket.aiSuggestion.text })] }))] }));
}
function StatusPill({ status }) {
    let label = status;
    let bg = "#F5F7FA";
    let textColor = "#4A5568";
    let border = "#E2E8F0";
    if (status === "OPEN") {
        label = "Open";
        bg = "#FEE2E2";
        textColor = "#DC2626";
        border = "#FCA5A5";
    }
    else if (status === "IN_PROGRESS") {
        label = "In Progress";
        bg = "#FEF3C7";
        textColor = "#D97706";
        border = "#FCD34D";
    }
    else if (status === "COMPLETED") {
        label = "Completed";
        bg = "#D1FAE5";
        textColor = "#059669";
        border = "#6EE7B7";
    }
    return (_jsx("div", { style: {
            padding: "4px 10px",
            borderRadius: "6px",
            border: `1px solid ${border}`,
            background: bg,
            fontSize: "0.75rem",
            fontWeight: 600,
            color: textColor,
        }, children: label }));
}
//# sourceMappingURL=TechnicianDashboardPage.js.map