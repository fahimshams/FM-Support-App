// src/pages/MachineDetailsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchMachines, fetchMachineInstances, fetchTickets } from "../api";
import type { Machine, MachineInstance, Ticket } from "../types";
import Card from "../components/Card";
import { resolveImageUrl } from "../utils/imageUtils";
import { machineryData } from "../data/models";
import Icon from "../components/Icon";

type TabType = "overview" | "warranty" | "history" | "manuals";

export default function MachineDetailsPage() {
  const { serialNumber } = useParams<{ serialNumber: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [instance, setInstance] = useState<MachineInstance | null>(null);
  const [machine, setMachine] = useState<any>(null);
  const [serviceHistory, setServiceHistory] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const machines = await fetchMachines();
        let found: MachineInstance | null = null;
        let machineModel: Machine | null = null;

        for (const machine of machines) {
          try {
            const instances = await fetchMachineInstances(machine.id);
            const matchingInstance = instances.find(
              (mi) => mi.serialNumber === serialNumber
            );
            if (matchingInstance) {
              found = matchingInstance;
              machineModel = machine;
              break;
            }
          } catch (err) {
            console.warn(`Failed to fetch instances for ${machine.id}`, err);
          }
        }

        if (!found || !machineModel) {
          setError("Machine not found");
          return;
        }

        setInstance(found);

        const machineData = machineryData.find(
          (m) => m.id === machineModel!.id || m.name.includes(machineModel!.model)
        );
        setMachine(machineData);

        const tickets = await fetchTickets();
        const history = tickets.filter(
          (t: any) =>
            t.machineSerial === serialNumber ||
            t.serialNumber === serialNumber ||
            t.machineId === found.machineId
        );
        setServiceHistory(history);
      } catch (err) {
        console.error("Failed to load machine details", err);
        setError("Failed to load machine details");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [serialNumber]);

  if (loading) {
    return (
      <div className="page-container">
        <p className="loading-message">Loading machine details...</p>
      </div>
    );
  }

  if (error || !instance) {
    return (
      <div className="page-container">
        <p className="error-message">{error || "Machine not found"}</p>
        <button onClick={() => navigate("/machines/registered")} className="primary-button">
          Back to My Machines
        </button>
      </div>
    );
  }

  // Mock data for warranty and technician
  const purchaseDate = new Date("2024-01-15");
  const warrantyStart = purchaseDate;
  const warrantyEnd = new Date(purchaseDate);
  warrantyEnd.setFullYear(warrantyEnd.getFullYear() + 1);
  const today = new Date();
  const warrantyProgress = Math.min(
    100,
    Math.max(
      0,
      ((today.getTime() - warrantyStart.getTime()) /
        (warrantyEnd.getTime() - warrantyStart.getTime())) *
        100
    )
  );
  const isWarrantyActive = today < warrantyEnd;
  const assignedTechnician = {
    name: "Ahmed Hassan",
    phone: "+880-1712-345678",
  };
  const currentStatus = "Operational";

  const imageUrl = resolveImageUrl(machine?.image);

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/dashboard" className="breadcrumb-link">
          Dashboard
        </Link>
        <span className="breadcrumb-separator">›</span>
        <Link to="/machines/registered" className="breadcrumb-link">
          Machines
        </Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Machine Details</span>
      </nav>

      {/* Header */}
      <div className="machine-details-header">
        <div>
          <h1 className="page-title">
            {machine?.name || "Machine Model"}
          </h1>
          <p className="page-subtitle">Serial Number: {instance.serialNumber}</p>
        </div>
        <button
          onClick={() => navigate("/machines/registered")}
          className="secondary-button"
        >
          ← Back to Machines
        </button>
      </div>

      {/* Tabs Navigation */}
      <Card className="tabs-nav-card">
        <nav className="tabs-nav">
          <button
            className={`tab-nav-button ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <Icon name="dashboard" />
            <span>Overview</span>
          </button>
          <button
            className={`tab-nav-button ${activeTab === "warranty" ? "active" : ""}`}
            onClick={() => setActiveTab("warranty")}
          >
            <Icon name="check" />
            <span>Warranty</span>
          </button>
          <button
            className={`tab-nav-button ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            <Icon name="history" />
            <span>Service History</span>
          </button>
          <button
            className={`tab-nav-button ${activeTab === "manuals" ? "active" : ""}`}
            onClick={() => setActiveTab("manuals")}
          >
            <Icon name="document" />
            <span>Manuals</span>
          </button>
        </nav>
      </Card>

      {/* Tab Content */}
      <Card className="tab-content-card">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="overview-grid">
              <div className="overview-item">
                <label className="overview-label">Installation Date</label>
                <div className="overview-value">
                  {purchaseDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="overview-item">
                <label className="overview-label">Current Status</label>
                <div className="overview-value">
                  <span className={`status-badge status-${currentStatus.toLowerCase()}`}>
                    {currentStatus}
                  </span>
                </div>
              </div>
              <div className="overview-item">
                <label className="overview-label">Assigned Technician</label>
                <div className="overview-value">
                  <div className="technician-info">
                    <div className="technician-name">{assignedTechnician.name}</div>
                    <div className="technician-phone">
                      <Icon name="phone" />
                      {assignedTechnician.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {imageUrl && (
              <div className="machine-image-container">
                <img
                  src={imageUrl}
                  alt={machine?.name || "Machine"}
                  className="machine-details-image"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="warranty-tab">
            <div className="warranty-info-grid">
              <div className="warranty-item">
                <label className="warranty-label">Warranty Start Date</label>
                <div className="warranty-value">
                  {warrantyStart.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="warranty-item">
                <label className="warranty-label">Warranty End Date</label>
                <div className="warranty-value">
                  {warrantyEnd.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="warranty-item">
                <label className="warranty-label">Warranty Status</label>
                <div className="warranty-value">
                  <span
                    className={`warranty-status-badge ${
                      isWarrantyActive ? "active" : "expired"
                    }`}
                  >
                    {isWarrantyActive ? "✓ Active" : "✗ Expired"}
                  </span>
                </div>
              </div>
            </div>
            <div className="warranty-progress-section">
              <label className="warranty-progress-label">
                Warranty Period Progress
              </label>
              <div className="warranty-progress-bar-container">
                <div
                  className={`warranty-progress-bar ${
                    isWarrantyActive ? "active" : "expired"
                  }`}
                  style={{ width: `${warrantyProgress}%` }}
                />
              </div>
              <div className="warranty-progress-text">
                {warrantyProgress.toFixed(1)}% of warranty period elapsed
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="history-tab">
            {serviceHistory.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-message">No service history available</p>
              </div>
            ) : (
              <div className="service-history-timeline">
                {serviceHistory.map((ticket) => (
                  <div key={ticket.id} className="timeline-item">
                    <div className="timeline-marker" />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <div className="timeline-title">
                          Ticket #{ticket.id} - {ticket.issueType}
                        </div>
                        <span
                          className={`status-badge status-${ticket.status.toLowerCase().replace("_", "-")}`}
                        >
                          {ticket.status === "OPEN"
                            ? "Open"
                            : ticket.status === "IN_PROGRESS"
                            ? "In Progress"
                            : "Closed"}
                        </span>
                      </div>
                      <div className="timeline-description">{ticket.description}</div>
                      <div className="timeline-meta">
                        <span className="timeline-date">
                          Created: {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        {ticket.technicianId && (
                          <span className="timeline-technician">
                            Technician: {ticket.technicianId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "manuals" && (
          <div className="manuals-tab">
            <h3 className="manuals-title">Available Documentation</h3>
            <div className="manuals-list">
              <a
                href="#"
                className="manual-download-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert("User Manual download would be available here");
                }}
              >
                <Icon name="document" />
                <div className="manual-link-content">
                  <div className="manual-link-title">User Manual</div>
                  <div className="manual-link-subtitle">PDF • 2.5 MB</div>
                </div>
                <Icon name="download" />
              </a>
              <a
                href="#"
                className="manual-download-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Maintenance Guide download would be available here");
                }}
              >
                <Icon name="document" />
                <div className="manual-link-content">
                  <div className="manual-link-title">Maintenance Guide</div>
                  <div className="manual-link-subtitle">PDF • 1.8 MB</div>
                </div>
                <Icon name="download" />
              </a>
              <a
                href="#"
                className="manual-download-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Troubleshooting Guide download would be available here");
                }}
              >
                <Icon name="document" />
                <div className="manual-link-content">
                  <div className="manual-link-title">Troubleshooting Guide</div>
                  <div className="manual-link-subtitle">PDF • 1.2 MB</div>
                </div>
                <Icon name="download" />
              </a>
              <a
                href="#"
                className="manual-download-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Parts Catalog download would be available here");
                }}
              >
                <Icon name="document" />
                <div className="manual-link-content">
                  <div className="manual-link-title">Parts Catalog</div>
                  <div className="manual-link-subtitle">PDF • 3.1 MB</div>
                </div>
                <Icon name="download" />
              </a>
            </div>
          </div>
        )}
      </Card>

      {/* Create Support Ticket Button */}
      <div className="action-section">
        <button
          onClick={() =>
            navigate("/ticket", {
              state: {
                modelId: machine?.id,
                serial: instance.serialNumber,
                machineImage: imageUrl,
              },
            })
          }
          className="primary-button large-button"
        >
          Report a Problem
        </button>
      </div>
    </div>
  );
}
