// src/pages/CustomerDashboardPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMachines, fetchTickets, fetchMachineInstances } from "../api";
import type { Machine, Ticket } from "../types";
import Card from "../components/Card";

type MachineRow = {
  id: string;
  model: string;
  serialNumber: string;
  warrantyStatus: "active" | "expiring" | "expired";
  warrantyExpiry: string;
  supportStatus: "none" | "open" | "in-progress" | "resolved";
  ticketCount: number;
  machineId: string;
  instanceId: string;
};

type SortField = "model" | "serialNumber" | "warrantyStatus" | "supportStatus";
type SortDirection = "asc" | "desc";

export default function CustomerDashboardPage() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [machineRows, setMachineRows] = useState<MachineRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("model");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<MachineRow | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [machinesData, ticketsData]: [Machine[], Ticket[]] = await Promise.all([
          fetchMachines(),
          fetchTickets(),
        ]);
        setTickets(ticketsData);

        // Fetch instances for all machines and build table rows
        const rows: MachineRow[] = [];
        for (const machine of machinesData) {
          try {
            const instances = await fetchMachineInstances(machine.id);
            for (const instance of instances) {
              // Calculate warranty status (mock - would come from backend)
              const purchaseDate = new Date("2024-01-15");
              const warrantyExpiry = new Date(purchaseDate);
              warrantyExpiry.setFullYear(warrantyExpiry.getFullYear() + 1);
              const daysUntilExpiry = Math.ceil(
                (warrantyExpiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );

              let warrantyStatus: "active" | "expiring" | "expired" = "active";
              if (daysUntilExpiry < 0) {
                warrantyStatus = "expired";
              } else if (daysUntilExpiry <= 30) {
                warrantyStatus = "expiring";
              }

              // Find tickets for this machine instance
              const machineTickets = ticketsData.filter(
                (t) => t.machineId === machine.id
              );
              const openTickets = machineTickets.filter(
                (t) => t.status === "OPEN"
              );
              const inProgressTickets = machineTickets.filter(
                (t) => t.status === "IN_PROGRESS"
              );

              let supportStatus: "none" | "open" | "in-progress" | "resolved" = "none";
              if (inProgressTickets.length > 0) {
                supportStatus = "in-progress";
              } else if (openTickets.length > 0) {
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
          } catch (err) {
            console.warn(`Failed to fetch instances for ${machine.id}`, err);
          }
        }
        setMachineRows(rows);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Calculate summary stats
  const totalMachines = machineRows.length;
  const activeTickets = tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS").length;
  const warrantyExpiringSoon = machineRows.filter(
    (m) => m.warrantyStatus === "expiring"
  ).length;

  // Sort machines
  const sortedMachines = [...machineRows].sort((a, b) => {
    let aValue: string | number = "";
    let bValue: string | number = "";

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

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleCreateTicket = (machine: MachineRow) => {
    setSelectedMachine(machine);
    setShowTicketModal(true);
  };

  const handleViewMachine = (machine: MachineRow) => {
    navigate(`/machines/details/${machine.serialNumber}`);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">My Dashboard</h1>
          <p className="dashboard-subtitle">View your machines and get help when needed</p>
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="dashboard-grid-layout">
        {/* Left Column - Summary Cards */}
        <div className="dashboard-left-column">
          <div className="summary-cards">
            <Card className="summary-card">
              <div className="summary-card-icon">🏭</div>
              <div className="summary-card-content">
                <div className="summary-card-label">Total Machines</div>
                <div className="summary-card-value">{totalMachines}</div>
              </div>
            </Card>

            <Card className="summary-card highlight">
              <div className="summary-card-icon">🎫</div>
              <div className="summary-card-content">
                <div className="summary-card-label">Active Tickets</div>
                <div className="summary-card-value">{activeTickets}</div>
              </div>
            </Card>

            <Card className="summary-card warning">
              <div className="summary-card-icon">⚠️</div>
              <div className="summary-card-content">
                <div className="summary-card-label">Warranty Expiring</div>
                <div className="summary-card-value">{warrantyExpiringSoon}</div>
              </div>
            </Card>
          </div>

          {/* Quick Actions Card */}
          <Card className="quick-actions-card">
            <h3 className="quick-actions-title">Quick Actions</h3>
            <div className="quick-actions-list">
              <button
                onClick={() => navigate("/ticket")}
                className="quick-action-button"
              >
                <span className="quick-action-icon">📝</span>
                <span>Report Problem</span>
              </button>
              <button
                onClick={() => navigate("/ai/assistant")}
                className="quick-action-button"
              >
                <span className="quick-action-icon">💬</span>
                <span>Get Quick Help</span>
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="quick-action-button"
              >
                <span className="quick-action-icon">📞</span>
                <span>Contact Support</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Right Column - Machines Table */}
        <div className="dashboard-right-column">
          <Card className="table-card">
        <div className="table-header">
          <h2 className="table-title">My Machines</h2>
        </div>

        {sortedMachines.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏭</div>
            <h3 className="empty-state-title">No Machines Registered Yet</h3>
            <p className="empty-state-description">
              To register your machines and get support, please call us at{" "}
              <a href="tel:+8801712345678" className="phone-link">+880-1712-345678</a> or contact support.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="primary-button"
              style={{ marginTop: "16px" }}
            >
              Contact Support
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="machines-table">
              <thead>
                <tr>
                  <th
                    className={`table-header-cell ${sortField === "model" ? "active" : ""}`}
                    onClick={() => handleSort("model")}
                  >
                    Machine Model
                    {sortField === "model" && (
                      <span className="sort-indicator">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th
                    className={`table-header-cell ${sortField === "serialNumber" ? "active" : ""}`}
                    onClick={() => handleSort("serialNumber")}
                  >
                    Serial Number
                    {sortField === "serialNumber" && (
                      <span className="sort-indicator">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th
                    className={`table-header-cell ${sortField === "warrantyStatus" ? "active" : ""}`}
                    onClick={() => handleSort("warrantyStatus")}
                  >
                    Warranty Coverage
                    {sortField === "warrantyStatus" && (
                      <span className="sort-indicator">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th
                    className={`table-header-cell ${sortField === "supportStatus" ? "active" : ""}`}
                    onClick={() => handleSort("supportStatus")}
                  >
                    Current Issues
                    {sortField === "supportStatus" && (
                      <span className="sort-indicator">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th className="table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedMachines.map((machine) => (
                  <tr key={machine.id} className="table-row">
                    <td className="table-cell">{machine.model}</td>
                    <td className="table-cell serial-cell">{machine.serialNumber}</td>
                    <td className="table-cell">
                      <WarrantyBadge status={machine.warrantyStatus} expiry={machine.warrantyExpiry} />
                    </td>
                    <td className="table-cell">
                      <SupportBadge status={machine.supportStatus} count={machine.ticketCount} />
                    </td>
                    <td className="table-cell actions-cell">
                      <button
                        className="action-button secondary"
                        onClick={() => handleViewMachine(machine)}
                      >
                        View
                      </button>
                      <button
                        className="action-button primary"
                        onClick={() => handleCreateTicket(machine)}
                        title="Report a problem with this machine"
                      >
                        Report Problem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </Card>
        </div>
      </div>

      {/* Ticket Creation Modal */}
      {showTicketModal && selectedMachine && (
        <TicketModal
          machine={selectedMachine}
          onClose={() => {
            setShowTicketModal(false);
            setSelectedMachine(null);
          }}
          onSubmit={async () => {
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
            } catch (err) {
              console.error("Failed to create ticket", err);
            }
          }}
        />
      )}
    </div>
  );
}

function WarrantyBadge({
  status,
  expiry,
}: {
  status: "active" | "expiring" | "expired";
  expiry: string;
}) {
  const config = {
    active: { label: "🟢 Active", className: "badge-success", tooltip: `Your machine is covered until ${expiry}` },
    expiring: { label: "🟡 Expiring Soon", className: "badge-warning", tooltip: `Warranty expires on ${expiry}. Please renew soon.` },
    expired: { label: "🔴 Expired", className: "badge-error", tooltip: `Warranty expired on ${expiry}. Contact support for renewal.` },
  };

  const { label, className, tooltip } = config[status];

  return (
    <span className={`badge ${className}`} title={tooltip}>
      {label}
    </span>
  );
}

function SupportBadge({
  status,
  count,
}: {
  status: "none" | "open" | "in-progress" | "resolved";
  count: number;
}) {
  const config = {
    none: { label: "🟢 No Issues", className: "badge-neutral", tooltip: "Machine is working properly" },
    open: { label: "🟡 Needs Help", className: "badge-warning", tooltip: `${count} open support request${count > 1 ? 's' : ''} - Click to view` },
    "in-progress": { label: "🔵 Being Fixed", className: "badge-info", tooltip: "Our technician is working on this issue" },
    resolved: { label: "✅ Fixed", className: "badge-success", tooltip: "All issues have been resolved" },
  };

  const { label, className, tooltip } = config[status];

  return (
    <span className={`badge ${className}`} title={tooltip}>
      {label}
    </span>
  );
}

function TicketModal({
  machine,
  onClose,
  onSubmit,
}: {
  machine: MachineRow;
  onClose: () => void;
  onSubmit: (issueType: string, description: string) => void;
}) {
  const [issueType, setIssueType] = useState("THREAD_BREAKING");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSubmitting(true);
    await onSubmit(issueType, description);
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Report a Problem</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="modal-machine-info">
            <div className="info-row">
              <span className="info-label">Machine:</span>
              <span className="info-value">{machine.model}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Serial:</span>
              <span className="info-value">{machine.serialNumber}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="ticket-form">
            <div className="form-group">
              <label className="form-label">What's the Problem?</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="form-select"
              >
                <option value="THREAD_BREAKING">Thread Breaking - Machine keeps breaking thread while sewing</option>
                <option value="STITCH_SKIPPING">Stitch Skipping - Machine is missing stitches</option>
                <option value="FABRIC_NOT_FEEDING">Fabric Not Feeding - Material is not moving through machine</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Describe the Problem</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us more about the problem..."
                rows={4}
                className="form-textarea"
                required
              />
              <div className="form-help-text">
                <strong>Helpful information to include:</strong>
                <ul style={{ margin: "8px 0 0 20px", fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }}>
                  <li>When did the problem start?</li>
                  <li>What were you doing when it happened?</li>
                  <li>How often does it occur?</li>
                  <li>Any unusual sounds or error messages?</li>
                </ul>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="button secondary"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button primary"
                disabled={submitting || !description.trim()}
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
