import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/TicketHistoryPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTickets, fetchMachines } from "../api";
import Card from "../components/Card";
import Icon from "../components/Icon";
export default function TicketHistoryPage() {
    const [tickets, setTickets] = useState([]);
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortField, setSortField] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("table");
    const navigate = useNavigate();
    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const [ticketsData, machinesData] = await Promise.all([
                    fetchTickets(),
                    fetchMachines(),
                ]);
                setTickets(ticketsData);
                setMachines(machinesData);
                setError(null);
            }
            catch (err) {
                console.error(err);
                setError("Failed to load ticket history");
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, []);
    function getMachineModel(ticket) {
        const machine = machines.find((m) => m.id === ticket.machineId);
        return machine?.model || ticket.machineId;
    }
    function handleSort(field) {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        }
        else {
            setSortField(field);
            setSortDirection("asc");
        }
    }
    function getSortIcon(field) {
        if (sortField !== field)
            return "sort";
        return sortDirection === "asc" ? "sort-up" : "sort-down";
    }
    // Filter tickets
    const filteredTickets = tickets.filter((ticket) => {
        const matchesStatus = statusFilter === "ALL" || ticket.status === statusFilter;
        const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            getMachineModel(ticket).toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });
    // Sort tickets
    const sortedTickets = [...filteredTickets].sort((a, b) => {
        let aValue;
        let bValue;
        switch (sortField) {
            case "ticketId":
                aValue = a.id;
                bValue = b.id;
                break;
            case "machineModel":
                aValue = getMachineModel(a);
                bValue = getMachineModel(b);
                break;
            case "issueType":
                aValue = a.issueType;
                bValue = b.issueType;
                break;
            case "status":
                aValue = a.status;
                bValue = b.status;
                break;
            case "createdAt":
                aValue = new Date(a.createdAt).getTime();
                bValue = new Date(b.createdAt).getTime();
                break;
            case "lastUpdated":
                aValue = new Date(a.createdAt).getTime();
                bValue = new Date(b.createdAt).getTime();
                break;
            default:
                return 0;
        }
        if (aValue < bValue)
            return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue)
            return sortDirection === "asc" ? 1 : -1;
        return 0;
    });
    // Calculate statistics
    const openCount = tickets.filter(t => t.status === "OPEN").length;
    const inProgressCount = tickets.filter(t => t.status === "IN_PROGRESS").length;
    const completedCount = tickets.filter(t => t.status === "COMPLETED").length;
    function getStatusBadge(status) {
        const statusConfig = {
            OPEN: { label: "Open", className: "status-badge-open" },
            IN_PROGRESS: { label: "In Progress", className: "status-badge-in-progress" },
            COMPLETED: { label: "Closed", className: "status-badge-closed" },
        };
        const config = statusConfig[status];
        return (_jsx("span", { className: `status-badge ${config.className}`, children: config.label }));
    }
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "header-row", children: [_jsxs("div", { children: [_jsx("h1", { className: "page-title", children: "My Support Requests" }), _jsx("p", { className: "page-subtitle", children: "View and track all your reported problems" })] }), _jsxs("button", { onClick: () => navigate("/ticket"), className: "primary-button", children: [_jsx(Icon, { name: "plus" }), "Report Problem"] })] }), !loading && !error && (_jsxs("div", { className: "tickets-stats-grid", children: [_jsxs(Card, { className: `stat-card clickable ${statusFilter === "ALL" ? "active" : ""}`, onClick: () => setStatusFilter("ALL"), children: [_jsx("div", { className: "stat-icon all", children: _jsx(Icon, { name: "ticket" }) }), _jsxs("div", { className: "stat-content", children: [_jsx("div", { className: "stat-value", children: tickets.length }), _jsx("div", { className: "stat-label", children: "All Tickets" })] })] }), _jsxs(Card, { className: `stat-card clickable ${statusFilter === "OPEN" ? "active" : ""}`, onClick: () => setStatusFilter("OPEN"), children: [_jsx("div", { className: "stat-icon open", children: _jsx(Icon, { name: "warning" }) }), _jsxs("div", { className: "stat-content", children: [_jsx("div", { className: "stat-value", children: openCount }), _jsx("div", { className: "stat-label", children: "Open" })] })] }), _jsxs(Card, { className: `stat-card clickable ${statusFilter === "IN_PROGRESS" ? "active" : ""}`, onClick: () => setStatusFilter("IN_PROGRESS"), children: [_jsx("div", { className: "stat-icon in-progress", children: _jsx(Icon, { name: "settings" }) }), _jsxs("div", { className: "stat-content", children: [_jsx("div", { className: "stat-value", children: inProgressCount }), _jsx("div", { className: "stat-label", children: "In Progress" })] })] }), _jsxs(Card, { className: `stat-card clickable ${statusFilter === "COMPLETED" ? "active" : ""}`, onClick: () => setStatusFilter("COMPLETED"), children: [_jsx("div", { className: "stat-icon completed", children: _jsx(Icon, { name: "check" }) }), _jsxs("div", { className: "stat-content", children: [_jsx("div", { className: "stat-value", children: completedCount }), _jsx("div", { className: "stat-label", children: "Completed" })] })] })] })), loading && (_jsx(Card, { className: "loading-card", children: _jsx("p", { className: "loading-message", children: "Loading tickets\u2026" }) })), error && (_jsx(Card, { className: "error-card", children: _jsx("p", { className: "error-message", children: error }) })), !loading && !error && (_jsxs(_Fragment, { children: [_jsx(Card, { className: "search-filter-card", children: _jsxs("div", { className: "search-filter-row", children: [_jsxs("div", { className: "search-box", children: [_jsx(Icon, { name: "search" }), _jsx("input", { type: "text", placeholder: "Search tickets by ID, machine, or issue...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input-field" }), searchQuery && (_jsx("button", { onClick: () => setSearchQuery(""), className: "clear-search-button", children: _jsx(Icon, { name: "close" }) }))] }), _jsxs("div", { className: "filter-box", children: [_jsx("label", { className: "filter-label-short", children: "Status:" }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "filter-select-short", children: [_jsx("option", { value: "ALL", children: "All Status" }), _jsx("option", { value: "OPEN", children: "Open" }), _jsx("option", { value: "IN_PROGRESS", children: "In Progress" }), _jsx("option", { value: "COMPLETED", children: "Completed" })] })] }), _jsxs("div", { className: "view-mode-toggle", children: [_jsx("button", { onClick: () => setViewMode("table"), className: `view-mode-button ${viewMode === "table" ? "active" : ""}`, title: "Table View", children: _jsx(Icon, { name: "settings" }) }), _jsx("button", { onClick: () => setViewMode("cards"), className: `view-mode-button ${viewMode === "cards" ? "active" : ""}`, title: "Card View", children: _jsx(Icon, { name: "ticket" }) })] })] }) }), sortedTickets.length === 0 ? (_jsx(Card, { className: "empty-card", children: _jsxs("div", { className: "empty-state", children: [_jsx(Icon, { name: "ticket" }), _jsx("p", { className: "empty-state-message", children: statusFilter === "ALL" && !searchQuery
                                        ? "No support requests yet. Report a problem to get started."
                                        : `No requests found matching your search.` }), (statusFilter !== "ALL" || searchQuery) && (_jsx("button", { onClick: () => {
                                        setStatusFilter("ALL");
                                        setSearchQuery("");
                                    }, className: "secondary-button", children: "Clear Filters" }))] }) })) : viewMode === "table" ? (_jsx(Card, { className: "table-card", children: _jsx("div", { className: "table-wrapper", children: _jsxs("table", { className: "tickets-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsxs("th", { onClick: () => handleSort("ticketId"), className: "sortable-header", children: ["Ticket ID", _jsx(Icon, { name: getSortIcon("ticketId") })] }), _jsxs("th", { onClick: () => handleSort("machineModel"), className: "sortable-header", children: ["Machine Model", _jsx(Icon, { name: getSortIcon("machineModel") })] }), _jsxs("th", { onClick: () => handleSort("issueType"), className: "sortable-header", children: ["Issue Type", _jsx(Icon, { name: getSortIcon("issueType") })] }), _jsxs("th", { onClick: () => handleSort("status"), className: "sortable-header", children: ["Status", _jsx(Icon, { name: getSortIcon("status") })] }), _jsxs("th", { onClick: () => handleSort("createdAt"), className: "sortable-header", children: ["Created At", _jsx(Icon, { name: getSortIcon("createdAt") })] }), _jsx("th", { className: "action-column-header", children: _jsx(Icon, { name: "ticket" }) }), _jsx("th", { className: "action-column-header", children: _jsx(Icon, { name: "contact" }) })] }) }), _jsx("tbody", { children: sortedTickets.map((ticket) => (_jsxs("tr", { children: [_jsxs("td", { className: "font-mono text-sm", children: ["#", ticket.id] }), _jsx("td", { children: getMachineModel(ticket) }), _jsx("td", { children: ticket.issueType === "THREAD_BREAKING" ? "Thread Breaking" :
                                                        ticket.issueType === "STITCH_SKIPPING" ? "Stitch Skipping" :
                                                            ticket.issueType === "FABRIC_NOT_FEEDING" ? "Fabric Not Feeding" :
                                                                ticket.issueType.replace(/_/g, " ") }), _jsx("td", { children: getStatusBadge(ticket.status) }), _jsx("td", { children: new Date(ticket.createdAt).toLocaleDateString() }), _jsx("td", { className: "action-cell", children: _jsxs("button", { onClick: () => alert(`View ticket ${ticket.id} - Feature coming soon`), className: "action-menu-button primary", title: "View Ticket Details", children: [_jsx(Icon, { name: "ticket" }), _jsx("span", { children: "View" })] }) }), _jsx("td", { className: "action-cell", children: _jsxs("button", { onClick: () => alert("Chat feature coming soon"), className: "action-menu-button secondary", title: "Chat with Support", children: [_jsx(Icon, { name: "contact" }), _jsx("span", { children: "Chat" })] }) })] }, ticket.id))) })] }) }) })) : (
                    /* Card View */
                    _jsx("div", { className: "tickets-cards-view", children: sortedTickets.map((ticket) => (_jsxs(Card, { className: "ticket-card-item", children: [_jsxs("div", { className: "ticket-card-header", children: [_jsxs("div", { className: "ticket-card-id", children: [_jsx(Icon, { name: "ticket" }), "#", ticket.id] }), getStatusBadge(ticket.status)] }), _jsxs("div", { className: "ticket-card-body", children: [_jsxs("div", { className: "ticket-card-field", children: [_jsx("span", { className: "ticket-field-label", children: "Machine:" }), _jsx("span", { className: "ticket-field-value", children: getMachineModel(ticket) })] }), _jsxs("div", { className: "ticket-card-field", children: [_jsx("span", { className: "ticket-field-label", children: "Issue:" }), _jsx("span", { className: "ticket-field-value", children: ticket.issueType === "THREAD_BREAKING" ? "Thread Breaking" :
                                                        ticket.issueType === "STITCH_SKIPPING" ? "Stitch Skipping" :
                                                            ticket.issueType === "FABRIC_NOT_FEEDING" ? "Fabric Not Feeding" :
                                                                ticket.issueType.replace(/_/g, " ") })] }), _jsx("div", { className: "ticket-card-description", children: ticket.description.length > 100
                                                ? `${ticket.description.substring(0, 100)}...`
                                                : ticket.description }), _jsxs("div", { className: "ticket-card-date", children: ["Created: ", new Date(ticket.createdAt).toLocaleDateString()] })] }), _jsxs("div", { className: "ticket-card-actions", children: [_jsxs("button", { onClick: () => alert(`View ticket ${ticket.id} - Feature coming soon`), className: "action-menu-button primary", children: [_jsx(Icon, { name: "ticket" }), _jsx("span", { children: "View Details" })] }), _jsxs("button", { onClick: () => alert("Chat feature coming soon"), className: "action-menu-button secondary", children: [_jsx(Icon, { name: "contact" }), _jsx("span", { children: "Chat" })] })] })] }, ticket.id))) }))] }))] }));
}
//# sourceMappingURL=TicketHistoryPage.js.map