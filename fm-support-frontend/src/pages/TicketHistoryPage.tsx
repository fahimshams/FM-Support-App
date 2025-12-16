// src/pages/TicketHistoryPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTickets, fetchMachines } from "../api";
import type { Ticket, Machine } from "../types";
import Card from "../components/Card";
import Icon from "../components/Icon";

type SortField = "ticketId" | "machineModel" | "issueType" | "status" | "createdAt" | "lastUpdated";
type SortDirection = "asc" | "desc";
type StatusFilter = "ALL" | "OPEN" | "IN_PROGRESS" | "COMPLETED";
type ViewMode = "table" | "cards";

export default function TicketHistoryPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
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
      } catch (err) {
        console.error(err);
        setError("Failed to load ticket history");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function getMachineModel(ticket: Ticket): string {
    const machine = machines.find((m) => m.id === ticket.machineId);
    return machine?.model || ticket.machineId;
  }

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  function getSortIcon(field: SortField) {
    if (sortField !== field) return "sort";
    return sortDirection === "asc" ? "sort-up" : "sort-down";
  }

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = statusFilter === "ALL" || ticket.status === statusFilter;
    const matchesSearch = 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getMachineModel(ticket).toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    let aValue: any;
    let bValue: any;

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

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Calculate statistics
  const openCount = tickets.filter(t => t.status === "OPEN").length;
  const inProgressCount = tickets.filter(t => t.status === "IN_PROGRESS").length;
  const completedCount = tickets.filter(t => t.status === "COMPLETED").length;

  function getStatusBadge(status: Ticket["status"]) {
    const statusConfig = {
      OPEN: { label: "Open", className: "status-badge-open" },
      IN_PROGRESS: { label: "In Progress", className: "status-badge-in-progress" },
      COMPLETED: { label: "Closed", className: "status-badge-closed" },
    };
    const config = statusConfig[status];
    return (
      <span className={`status-badge ${config.className}`}>
        {config.label}
      </span>
    );
  }

  return (
    <div className="page-container">
      <div className="header-row">
        <div>
          <h1 className="page-title">My Support Requests</h1>
          <p className="page-subtitle">
            View and track all your reported problems
          </p>
        </div>
        <button
          onClick={() => navigate("/ticket")}
          className="primary-button"
        >
          <Icon name="plus" />
          Report Problem
        </button>
      </div>

      {/* Statistics Cards */}
      {!loading && !error && (
        <div className="tickets-stats-grid">
          <Card 
            className={`stat-card clickable ${statusFilter === "ALL" ? "active" : ""}`}
            onClick={() => setStatusFilter("ALL")}
          >
            <div className="stat-icon all">
              <Icon name="ticket" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{tickets.length}</div>
              <div className="stat-label">All Tickets</div>
            </div>
          </Card>
          <Card 
            className={`stat-card clickable ${statusFilter === "OPEN" ? "active" : ""}`}
            onClick={() => setStatusFilter("OPEN")}
          >
            <div className="stat-icon open">
              <Icon name="warning" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{openCount}</div>
              <div className="stat-label">Open</div>
            </div>
          </Card>
          <Card 
            className={`stat-card clickable ${statusFilter === "IN_PROGRESS" ? "active" : ""}`}
            onClick={() => setStatusFilter("IN_PROGRESS")}
          >
            <div className="stat-icon in-progress">
              <Icon name="settings" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{inProgressCount}</div>
              <div className="stat-label">In Progress</div>
            </div>
          </Card>
          <Card 
            className={`stat-card clickable ${statusFilter === "COMPLETED" ? "active" : ""}`}
            onClick={() => setStatusFilter("COMPLETED")}
          >
            <div className="stat-icon completed">
              <Icon name="check" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{completedCount}</div>
              <div className="stat-label">Completed</div>
            </div>
          </Card>
        </div>
      )}

      {loading && (
        <Card className="loading-card">
          <p className="loading-message">Loading tickets…</p>
        </Card>
      )}

      {error && (
        <Card className="error-card">
          <p className="error-message">{error}</p>
        </Card>
      )}

      {!loading && !error && (
        <>
          {/* Search and Filter Bar */}
          <Card className="search-filter-card">
            <div className="search-filter-row">
              <div className="search-box">
                <Icon name="search" />
                <input
                  type="text"
                  placeholder="Search tickets by ID, machine, or issue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-field"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="clear-search-button"
                  >
                    <Icon name="close" />
                  </button>
                )}
              </div>
              <div className="filter-box">
                <label className="filter-label-short">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="filter-select-short"
                >
                  <option value="ALL">All Status</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div className="view-mode-toggle">
                <button
                  onClick={() => setViewMode("table")}
                  className={`view-mode-button ${viewMode === "table" ? "active" : ""}`}
                  title="Table View"
                >
                  <Icon name="settings" />
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`view-mode-button ${viewMode === "cards" ? "active" : ""}`}
                  title="Card View"
                >
                  <Icon name="ticket" />
                </button>
              </div>
            </div>
          </Card>

          {/* Table View */}
          {sortedTickets.length === 0 ? (
            <Card className="empty-card">
              <div className="empty-state">
                <Icon name="ticket" />
                <p className="empty-state-message">
                  {statusFilter === "ALL" && !searchQuery
                    ? "No support requests yet. Report a problem to get started."
                    : `No requests found matching your search.`}
                </p>
                {(statusFilter !== "ALL" || searchQuery) && (
                  <button
                    onClick={() => {
                      setStatusFilter("ALL");
                      setSearchQuery("");
                    }}
                    className="secondary-button"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </Card>
          ) : viewMode === "table" ? (
            <Card className="table-card">
              <div className="table-wrapper">
                <table className="tickets-table">
                  <thead>
                    <tr>
                      <th
                        onClick={() => handleSort("ticketId")}
                        className="sortable-header"
                      >
                        Ticket ID
                        <Icon name={getSortIcon("ticketId")} />
                      </th>
                      <th
                        onClick={() => handleSort("machineModel")}
                        className="sortable-header"
                      >
                        Machine Model
                        <Icon name={getSortIcon("machineModel")} />
                      </th>
                      <th
                        onClick={() => handleSort("issueType")}
                        className="sortable-header"
                      >
                        Issue Type
                        <Icon name={getSortIcon("issueType")} />
                      </th>
                      <th
                        onClick={() => handleSort("status")}
                        className="sortable-header"
                      >
                        Status
                        <Icon name={getSortIcon("status")} />
                      </th>
                      <th
                        onClick={() => handleSort("createdAt")}
                        className="sortable-header"
                      >
                        Created At
                        <Icon name={getSortIcon("createdAt")} />
                      </th>
                      <th className="action-column-header">
                        <Icon name="ticket" />
                      </th>
                      <th className="action-column-header">
                        <Icon name="contact" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td className="font-mono text-sm">#{ticket.id}</td>
                        <td>{getMachineModel(ticket)}</td>
                        <td>
                          {ticket.issueType === "THREAD_BREAKING" ? "Thread Breaking" :
                           ticket.issueType === "STITCH_SKIPPING" ? "Stitch Skipping" :
                           ticket.issueType === "FABRIC_NOT_FEEDING" ? "Fabric Not Feeding" :
                           ticket.issueType.replace(/_/g, " ")}
                        </td>
                        <td>{getStatusBadge(ticket.status)}</td>
                        <td>
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </td>
                        <td className="action-cell">
                          <button
                            onClick={() =>
                              alert(`View ticket ${ticket.id} - Feature coming soon`)
                            }
                            className="action-menu-button primary"
                            title="View Ticket Details"
                          >
                            <Icon name="ticket" />
                            <span>View</span>
                          </button>
                        </td>
                        <td className="action-cell">
                          <button
                            onClick={() =>
                              alert("Chat feature coming soon")
                            }
                            className="action-menu-button secondary"
                            title="Chat with Support"
                          >
                            <Icon name="contact" />
                            <span>Chat</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            /* Card View */
            <div className="tickets-cards-view">
              {sortedTickets.map((ticket) => (
                <Card key={ticket.id} className="ticket-card-item">
                  <div className="ticket-card-header">
                    <div className="ticket-card-id">
                      <Icon name="ticket" />
                      #{ticket.id}
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <div className="ticket-card-body">
                    <div className="ticket-card-field">
                      <span className="ticket-field-label">Machine:</span>
                      <span className="ticket-field-value">{getMachineModel(ticket)}</span>
                    </div>
                    <div className="ticket-card-field">
                      <span className="ticket-field-label">Issue:</span>
                      <span className="ticket-field-value">
                        {ticket.issueType === "THREAD_BREAKING" ? "Thread Breaking" :
                         ticket.issueType === "STITCH_SKIPPING" ? "Stitch Skipping" :
                         ticket.issueType === "FABRIC_NOT_FEEDING" ? "Fabric Not Feeding" :
                         ticket.issueType.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="ticket-card-description">
                      {ticket.description.length > 100
                        ? `${ticket.description.substring(0, 100)}...`
                        : ticket.description}
                    </div>
                    <div className="ticket-card-date">
                      Created: {new Date(ticket.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="ticket-card-actions">
                    <button
                      onClick={() =>
                        alert(`View ticket ${ticket.id} - Feature coming soon`)
                      }
                      className="action-menu-button primary"
                    >
                      <Icon name="ticket" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => alert("Chat feature coming soon")}
                      className="action-menu-button secondary"
                    >
                      <Icon name="contact" />
                      <span>Chat</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
