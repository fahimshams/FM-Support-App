import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateTicket } from "../api";
import Card from "../components/Card";
export default function TechnicianTicketPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [ticket, setTicket] = useState(location.state?.ticket || null);
    const techName = location.state?.techName || "Technician";
    const [status, setStatus] = useState(ticket?.status || "OPEN");
    const [note, setNote] = useState("");
    const [saving, setSaving] = useState(false);
    if (!ticket) {
        return (_jsx("div", { style: { maxWidth: "600px", margin: "0 auto" }, children: _jsxs(Card, { style: { padding: "32px", textAlign: "center" }, children: [_jsx("p", { style: { fontSize: "0.95rem", color: "#718096", marginBottom: "20px" }, children: "No ticket data. Please open from Technician Dashboard." }), _jsx("button", { onClick: () => navigate(-1), style: {
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#0066CC",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }, onMouseEnter: (e) => {
                            e.currentTarget.style.background = "#0052A3";
                        }, onMouseLeave: (e) => {
                            e.currentTarget.style.background = "#0066CC";
                        }, children: "Back" })] }) }));
    }
    async function handleSave() {
        try {
            setSaving(true);
            const res = await updateTicket(ticket.id, {
                status,
                technicianId: "tech1",
                note: note || undefined,
            });
            setTicket(res.ticket);
            setNote("");
            alert("Ticket updated successfully!");
        }
        catch (err) {
            console.error(err);
            alert("Failed to update ticket");
        }
        finally {
            setSaving(false);
        }
    }
    return (_jsxs("div", { style: { maxWidth: "900px", margin: "0 auto" }, children: [_jsx("button", { onClick: () => navigate(-1), style: {
                    marginBottom: "20px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    background: "#FFFFFF",
                    color: "#4A5568",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                }, onMouseEnter: (e) => {
                    e.currentTarget.style.background = "#F5F7FA";
                    e.currentTarget.style.borderColor = "#CBD5E0";
                }, onMouseLeave: (e) => {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#E2E8F0";
                }, children: "\u2190 Back" }), _jsxs("div", { style: { marginBottom: "24px" }, children: [_jsxs("h1", { style: { fontSize: "1.75rem", marginBottom: "8px", color: "#1A1F36", fontWeight: 600 }, children: ["Ticket Detail \u2013 ", ticket.id] }), _jsxs("p", { style: { fontSize: "0.95rem", color: "#718096" }, children: ["Technician: ", techName] })] }), _jsxs(Card, { style: { marginBottom: "24px", padding: "24px" }, children: [_jsxs("div", { style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "16px",
                            marginBottom: "20px",
                        }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }, children: "Machine ID" }), _jsx("div", { style: { fontSize: "1rem", fontWeight: 500, color: "#1A1F36" }, children: ticket.machineId })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }, children: "Issue Type" }), _jsx("div", { style: { fontSize: "1rem", fontWeight: 500, color: "#1A1F36" }, children: ticket.issueType.replace(/_/g, " ") })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }, children: "Status" }), _jsx("div", { style: { fontSize: "1rem", fontWeight: 500, color: "#1A1F36" }, children: ticket.status })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }, children: "Created" }), _jsx("div", { style: { fontSize: "1rem", fontWeight: 500, color: "#1A1F36" }, children: new Date(ticket.createdAt).toLocaleString() })] })] }), _jsxs("div", { style: { marginBottom: "20px" }, children: [_jsx("div", { style: { fontSize: "0.875rem", color: "#718096", marginBottom: "8px" }, children: "Description" }), _jsx("div", { style: {
                                    fontSize: "1rem",
                                    color: "#1A1F36",
                                    lineHeight: 1.6,
                                    padding: "12px",
                                    background: "#F5F7FA",
                                    borderRadius: "8px",
                                }, children: ticket.description })] }), ticket.aiSuggestion && (_jsxs(Card, { style: {
                            padding: "20px",
                            background: "#E6F2FF",
                            border: "1px solid #B3D9FF",
                        }, children: [_jsxs("div", { style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "12px",
                                }, children: [_jsx("div", { style: {
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "8px",
                                            background: "#0066CC",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "0.875rem",
                                            fontWeight: 700,
                                        }, children: "AI" }), _jsx("div", { style: { fontSize: "1rem", fontWeight: 600, color: "#1A1F36" }, children: "AI Suggestion" })] }), _jsx("div", { style: {
                                    fontSize: "0.95rem",
                                    color: "#1A1F36",
                                    lineHeight: 1.6,
                                    whiteSpace: "pre-wrap",
                                    marginBottom: "12px",
                                }, children: ticket.aiSuggestion.text }), _jsxs("div", { style: {
                                    fontSize: "0.8rem",
                                    color: "#4A5568",
                                    paddingTop: "12px",
                                    borderTop: "1px solid #B3D9FF",
                                }, children: ["From cache: ", ticket.aiSuggestion.fromCache ? "Yes" : "No", " \u00B7 Credits used:", " ", ticket.aiSuggestion.creditsUsed] })] }))] }), _jsxs(Card, { style: { padding: "24px" }, children: [_jsxs("div", { style: { marginBottom: "20px" }, children: [_jsx("label", { style: {
                                    display: "block",
                                    marginBottom: "8px",
                                    fontSize: "0.9rem",
                                    fontWeight: 500,
                                    color: "#1A1F36",
                                }, children: "Update Status" }), _jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), style: {
                                    width: "100%",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    border: "1px solid #E2E8F0",
                                    background: "#FFFFFF",
                                    color: "#1A1F36",
                                    fontSize: "0.9rem",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }, onFocus: (e) => {
                                    e.currentTarget.style.borderColor = "#0066CC";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 102, 204, 0.1)";
                                }, onBlur: (e) => {
                                    e.currentTarget.style.borderColor = "#E2E8F0";
                                    e.currentTarget.style.boxShadow = "none";
                                }, children: [_jsx("option", { value: "OPEN", children: "OPEN" }), _jsx("option", { value: "IN_PROGRESS", children: "IN_PROGRESS" }), _jsx("option", { value: "COMPLETED", children: "COMPLETED" })] })] }), _jsxs("div", { style: { marginBottom: "24px" }, children: [_jsx("label", { style: {
                                    display: "block",
                                    marginBottom: "8px",
                                    fontSize: "0.9rem",
                                    fontWeight: 500,
                                    color: "#1A1F36",
                                }, children: "Add Technician Note" }), _jsx("textarea", { rows: 4, value: note, onChange: (e) => setNote(e.target.value), placeholder: "E.g., Adjusted needle bar height, cleaned hook, test stitched at 4000 RPM.", style: {
                                    width: "100%",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    border: "1px solid #E2E8F0",
                                    background: "#FFFFFF",
                                    color: "#1A1F36",
                                    resize: "vertical",
                                    fontSize: "0.9rem",
                                    fontFamily: "inherit",
                                    transition: "all 0.2s ease",
                                }, onFocus: (e) => {
                                    e.currentTarget.style.borderColor = "#0066CC";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 102, 204, 0.1)";
                                }, onBlur: (e) => {
                                    e.currentTarget.style.borderColor = "#E2E8F0";
                                    e.currentTarget.style.boxShadow = "none";
                                } })] }), _jsx("button", { onClick: handleSave, disabled: saving, style: {
                            width: "100%",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            border: "none",
                            background: saving ? "#CBD5E0" : "#00A651",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            cursor: saving ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease",
                        }, onMouseEnter: (e) => {
                            if (!saving) {
                                e.currentTarget.style.background = "#059669";
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }
                        }, onMouseLeave: (e) => {
                            if (!saving) {
                                e.currentTarget.style.background = "#00A651";
                                e.currentTarget.style.transform = "translateY(0)";
                            }
                        }, children: saving ? "Saving…" : "Save Update" }), ticket.technicianNotes && ticket.technicianNotes.length > 0 && (_jsxs("div", { style: {
                            marginTop: "24px",
                            padding: "16px",
                            borderRadius: "8px",
                            background: "#F5F7FA",
                            border: "1px solid #E2E8F0",
                        }, children: [_jsx("div", { style: {
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    color: "#1A1F36",
                                    marginBottom: "12px",
                                }, children: "Previous Notes:" }), _jsx("ul", { style: { paddingLeft: "20px", margin: 0, fontSize: "0.875rem", color: "#4A5568" }, children: ticket.technicianNotes.map((n, idx) => (_jsx("li", { style: { marginBottom: "8px", lineHeight: 1.5 }, children: n }, idx))) })] }))] })] }));
}
//# sourceMappingURL=TechnicianTicketPage.js.map