import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/CustomerDashboardPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMachines, fetchTickets, fetchMachineInstances } from "../api";
import Card from "../components/Card";
export default function CustomerDashboardPage() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [machineRows, setMachineRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState("model");
    const [sortDirection, setSortDirection] = useState("asc");
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);
    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const [machinesData, ticketsData] = await Promise.all([
                    fetchMachines(),
                    fetchTickets(),
                ]);
                setTickets(ticketsData);
                // Fetch instances for all machines and build table rows
                const rows = [];
                for (const machine of machinesData) {
                    try {
                        const instances = await fetchMachineInstances(machine.id);
                        for (const instance of instances) {
                            // Calculate warranty status (mock - would come from backend)
                            const purchaseDate = new Date("2024-01-15");
                            const warrantyExpiry = new Date(purchaseDate);
                            warrantyExpiry.setFullYear(warrantyExpiry.getFullYear() + 1);
                            const daysUntilExpiry = Math.ceil((warrantyExpiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                            let warrantyStatus = "active";
                            if (daysUntilExpiry < 0) {
                                warrantyStatus = "expired";
                            }
                            else if (daysUntilExpiry <= 30) {
                                warrantyStatus = "expiring";
                            }
                            // Find tickets for this machine instance
                            const machineTickets = ticketsData.filter((t) => t.machineId === machine.id);
                            const openTickets = machineTickets.filter((t) => t.status === "OPEN");
                            const inProgressTickets = machineTickets.filter((t) => t.status === "IN_PROGRESS");
                            let supportStatus = "none";
                            if (inProgressTickets.length > 0) {
                                supportStatus = "in-progress";
                            }
                            else if (openTickets.length > 0) {
                                supportStatus = "open";
                            }
                            rows.push({
                                id: instance.id,
                                model: machine.name || machine.model,
                                serialNumber: instance.serialNumber,
                                warrantyStatus,
                                warrantyExpiry: warrantyExpiry.toLocaleDateString(),
                                supportStatus,
                                ticketCount: machineTickets.length,
                                machineId: machine.id,
                                instanceId: instance.id,
                            });
                        }
                    }
                    catch (err) {
                        console.warn(`Failed to fetch instances for ${machine.id}`, err);
                    }
                }
                setMachineRows(rows);
            }
            catch (err) {
                console.error("Failed to load dashboard data", err);
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, []);
    // Calculate summary stats
    const totalMachines = machineRows.length;
    const activeTickets = tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS").length;
    const warrantyExpiringSoon = machineRows.filter((m) => m.warrantyStatus === "expiring").length;
    // Sort machines
    const sortedMachines = [...machineRows].sort((a, b) => {
        let aValue = "";
        let bValue = "";
        switch (sortField) {
            case "model":
                aValue = a.model.toLowerCase();
                bValue = b.model.toLowerCase();
                break;
            case "serialNumber":
                aValue = a.serialNumber.toLowerCase();
                bValue = b.serialNumber.toLowerCase();
                break;
            case "warrantyStatus":
                const statusOrder = { expired: 0, expiring: 1, active: 2 };
                aValue = statusOrder[a.warrantyStatus];
                bValue = statusOrder[b.warrantyStatus];
                break;
            case "supportStatus":
                const supportOrder = { none: 0, resolved: 1, open: 2, "in-progress": 3 };
                aValue = supportOrder[a.supportStatus];
                bValue = supportOrder[b.supportStatus];
                break;
        }
        if (aValue < bValue)
            return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue)
            return sortDirection === "asc" ? 1 : -1;
        return 0;
    });
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        }
        else {
            setSortField(field);
            setSortDirection("asc");
        }
    };
    const handleCreateTicket = (machine) => {
        setSelectedMachine(machine);
        setShowTicketModal(true);
    };
    const handleViewMachine = (machine) => {
        navigate(`/machines/details/${machine.serialNumber}`);
    };
    if (loading) {
        return (_jsx("div", { className: "dashboard-container", children: _jsx("div", { className: "loading-state", children: _jsx("p", { children: "Loading dashboard..." }) }) }));
    }
    return (_jsxs("div", { className: "dashboard-container", children: [_jsx("div", { className: "dashboard-header", children: _jsxs("div", { children: [_jsx("h1", { className: "dashboard-title", children: "My Dashboard" }), _jsx("p", { className: "dashboard-subtitle", children: "View your machines and get help when needed" })] }) }), _jsxs("div", { className: "dashboard-grid-layout", children: [_jsxs("div", { className: "dashboard-left-column", children: [_jsxs("div", { className: "summary-cards", children: [_jsxs(Card, { className: "summary-card", children: [_jsx("div", { className: "summary-card-icon", children: "\uD83C\uDFED" }), _jsxs("div", { className: "summary-card-content", children: [_jsx("div", { className: "summary-card-label", children: "Total Machines" }), _jsx("div", { className: "summary-card-value", children: totalMachines })] })] }), _jsxs(Card, { className: "summary-card highlight", children: [_jsx("div", { className: "summary-card-icon", children: "\uD83C\uDFAB" }), _jsxs("div", { className: "summary-card-content", children: [_jsx("div", { className: "summary-card-label", children: "Active Tickets" }), _jsx("div", { className: "summary-card-value", children: activeTickets })] })] }), _jsxs(Card, { className: "summary-card warning", children: [_jsx("div", { className: "summary-card-icon", children: "\u26A0\uFE0F" }), _jsxs("div", { className: "summary-card-content", children: [_jsx("div", { className: "summary-card-label", children: "Warranty Expiring" }), _jsx("div", { className: "summary-card-value", children: warrantyExpiringSoon })] })] })] }), _jsxs(Card, { className: "quick-actions-card", children: [_jsx("h3", { className: "quick-actions-title", children: "Quick Actions" }), _jsxs("div", { className: "quick-actions-list", children: [_jsxs("button", { onClick: () => navigate("/ticket"), className: "quick-action-button", children: [_jsx("span", { className: "quick-action-icon", children: "\uD83D\uDCDD" }), _jsx("span", { children: "Report Problem" })] }), _jsxs("button", { onClick: () => navigate("/ai/assistant"), className: "quick-action-button", children: [_jsx("span", { className: "quick-action-icon", children: "\uD83D\uDCAC" }), _jsx("span", { children: "Get Quick Help" })] }), _jsxs("button", { onClick: () => navigate("/contact"), className: "quick-action-button", children: [_jsx("span", { className: "quick-action-icon", children: "\uD83D\uDCDE" }), _jsx("span", { children: "Contact Support" })] })] })] })] }), _jsx("div", { className: "dashboard-right-column", children: _jsxs(Card, { className: "table-card", children: [_jsx("div", { className: "table-header", children: _jsx("h2", { className: "table-title", children: "My Machines" }) }), sortedMachines.length === 0 ? (_jsxs("div", { className: "empty-state", children: [_jsx("div", { className: "empty-state-icon", children: "\uD83C\uDFED" }), _jsx("h3", { className: "empty-state-title", children: "No Machines Registered Yet" }), _jsxs("p", { className: "empty-state-description", children: ["To register your machines and get support, please call us at", " ", _jsx("a", { href: "tel:+8801712345678", className: "phone-link", children: "+880-1712-345678" }), " or contact support."] }), _jsx("button", { onClick: () => navigate("/contact"), className: "primary-button", style: { marginTop: "16px" }, children: "Contact Support" })] })) : (_jsx("div", { className: "table-wrapper", children: _jsxs("table", { className: "machines-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsxs("th", { className: `table-header-cell ${sortField === "model" ? "active" : ""}`, onClick: () => handleSort("model"), children: ["Machine Model", sortField === "model" && (_jsx("span", { className: "sort-indicator", children: sortDirection === "asc" ? "↑" : "↓" }))] }), _jsxs("th", { className: `table-header-cell ${sortField === "serialNumber" ? "active" : ""}`, onClick: () => handleSort("serialNumber"), children: ["Serial Number", sortField === "serialNumber" && (_jsx("span", { className: "sort-indicator", children: sortDirection === "asc" ? "↑" : "↓" }))] }), _jsxs("th", { className: `table-header-cell ${sortField === "warrantyStatus" ? "active" : ""}`, onClick: () => handleSort("warrantyStatus"), children: ["Warranty Coverage", sortField === "warrantyStatus" && (_jsx("span", { className: "sort-indicator", children: sortDirection === "asc" ? "↑" : "↓" }))] }), _jsxs("th", { className: `table-header-cell ${sortField === "supportStatus" ? "active" : ""}`, onClick: () => handleSort("supportStatus"), children: ["Current Issues", sortField === "supportStatus" && (_jsx("span", { className: "sort-indicator", children: sortDirection === "asc" ? "↑" : "↓" }))] }), _jsx("th", { className: "table-header-cell", children: "Actions" })] }) }), _jsx("tbody", { children: sortedMachines.map((machine) => (_jsxs("tr", { className: "table-row", children: [_jsx("td", { className: "table-cell", children: machine.model }), _jsx("td", { className: "table-cell serial-cell", children: machine.serialNumber }), _jsx("td", { className: "table-cell", children: _jsx(WarrantyBadge, { status: machine.warrantyStatus, expiry: machine.warrantyExpiry }) }), _jsx("td", { className: "table-cell", children: _jsx(SupportBadge, { status: machine.supportStatus, count: machine.ticketCount }) }), _jsxs("td", { className: "table-cell actions-cell", children: [_jsx("button", { className: "action-button secondary", onClick: () => handleViewMachine(machine), children: "View" }), _jsx("button", { className: "action-button primary", onClick: () => handleCreateTicket(machine), title: "Report a problem with this machine", children: "Report Problem" })] })] }, machine.id))) })] }) }))] }) })] }), showTicketModal && selectedMachine && (_jsx(TicketModal, { machine: selectedMachine, onClose: () => {
                    setShowTicketModal(false);
                    setSelectedMachine(null);
                }, onSubmit: async () => {
                    // Handle ticket creation
                    try {
                        // Navigate to ticket page with pre-filled data
                        navigate("/ticket", {
                            state: {
                                modelId: selectedMachine.machineId,
                                serial: selectedMachine.serialNumber,
                            },
                        });
                        setShowTicketModal(false);
                        setSelectedMachine(null);
                    }
                    catch (err) {
                        console.error("Failed to create ticket", err);
                    }
                } }))] }));
}
function WarrantyBadge({ status, expiry, }) {
    const config = {
        active: { label: "🟢 Active", className: "badge-success", tooltip: `Your machine is covered until ${expiry}` },
        expiring: { label: "🟡 Expiring Soon", className: "badge-warning", tooltip: `Warranty expires on ${expiry}. Please renew soon.` },
        expired: { label: "🔴 Expired", className: "badge-error", tooltip: `Warranty expired on ${expiry}. Contact support for renewal.` },
    };
    const { label, className, tooltip } = config[status];
    return (_jsx("span", { className: `badge ${className}`, title: tooltip, children: label }));
}
function SupportBadge({ status, count, }) {
    const config = {
        none: { label: "🟢 No Issues", className: "badge-neutral", tooltip: "Machine is working properly" },
        open: { label: "🟡 Needs Help", className: "badge-warning", tooltip: `${count} open support request${count > 1 ? 's' : ''} - Click to view` },
        "in-progress": { label: "🔵 Being Fixed", className: "badge-info", tooltip: "Our technician is working on this issue" },
        resolved: { label: "✅ Fixed", className: "badge-success", tooltip: "All issues have been resolved" },
    };
    const { label, className, tooltip } = config[status];
    return (_jsx("span", { className: `badge ${className}`, title: tooltip, children: label }));
}
function TicketModal({ machine, onClose, onSubmit, }) {
    const [issueType, setIssueType] = useState("THREAD_BREAKING");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim())
            return;
        setSubmitting(true);
        await onSubmit(issueType, description);
        setSubmitting(false);
    };
    return (_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h2", { className: "modal-title", children: "Report a Problem" }), _jsx("button", { className: "modal-close", onClick: onClose, children: "\u00D7" })] }), _jsxs("div", { className: "modal-body", children: [_jsxs("div", { className: "modal-machine-info", children: [_jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "Machine:" }), _jsx("span", { className: "info-value", children: machine.model })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "Serial:" }), _jsx("span", { className: "info-value", children: machine.serialNumber })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "ticket-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "What's the Problem?" }), _jsxs("select", { value: issueType, onChange: (e) => setIssueType(e.target.value), className: "form-select", children: [_jsx("option", { value: "THREAD_BREAKING", children: "Thread Breaking - Machine keeps breaking thread while sewing" }), _jsx("option", { value: "STITCH_SKIPPING", children: "Stitch Skipping - Machine is missing stitches" }), _jsx("option", { value: "FABRIC_NOT_FEEDING", children: "Fabric Not Feeding - Material is not moving through machine" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Describe the Problem" }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Tell us more about the problem...", rows: 4, className: "form-textarea", required: true }), _jsxs("div", { className: "form-help-text", children: [_jsx("strong", { children: "Helpful information to include:" }), _jsxs("ul", { style: { margin: "8px 0 0 20px", fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }, children: [_jsx("li", { children: "When did the problem start?" }), _jsx("li", { children: "What were you doing when it happened?" }), _jsx("li", { children: "How often does it occur?" }), _jsx("li", { children: "Any unusual sounds or error messages?" })] })] })] }), _jsxs("div", { className: "modal-actions", children: [_jsx("button", { type: "button", className: "button secondary", onClick: onClose, disabled: submitting, children: "Cancel" }), _jsx("button", { type: "submit", className: "button primary", disabled: submitting || !description.trim(), children: submitting ? "Submitting..." : "Submit Report" })] })] })] })] }) }));
}
//# sourceMappingURL=CustomerDashboardPage.js.map