// src/pages/RegisteredMachinesPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMachines, fetchMachineInstances } from "../api";
import type { Machine, MachineInstance } from "../types";
import Card from "../components/Card";
import Icon from "../components/Icon";

type MachineWithInstances = Machine & {
  instances: MachineInstance[];
};

export default function RegisteredMachinesPage() {
  const [machines, setMachines] = useState<MachineWithInstances[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const machinesData = await fetchMachines();
        // Fetch instances for each machine
        const machinesWithInstances = await Promise.all(
          machinesData.map(async (machine) => {
            try {
              const instances = await fetchMachineInstances(machine.id);
              return { ...machine, instances };
            } catch (err) {
              console.warn(`Failed to load instances for ${machine.id}`, err);
              return { ...machine, instances: [] };
            }
          })
        );
        setMachines(machinesWithInstances);
        setError(null);
      } catch (err) {
        console.error("Failed to load machines", err);
        setError("Failed to load machines");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Calculate statistics
  const totalMachines = machines.reduce((sum, m) => sum + m.instances.length, 0);
  const totalModels = machines.length;
  const machinesWithIssues = machines.filter(m => 
    m.instances.some(i => i.location?.toLowerCase().includes("issue"))
  ).length;

  // Filter machines based on search and model
  const filteredMachines = machines.filter((machine) => {
    const matchesSearch = 
      machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.instances.some(i => 
        i.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesModel = selectedModel === "all" || machine.id === selectedModel;
    return matchesSearch && matchesModel;
  });

  const allInstances = filteredMachines.flatMap(m => 
    m.instances.map(i => ({ ...i, machineModel: m.model, machineName: m.name }))
  );

  return (
    <div className="page-container">
      <div className="header-row">
        <div>
          <h1 className="page-title">My Machines</h1>
          <p className="page-subtitle">
            Manage and monitor all your registered machinery
          </p>
        </div>
        <button onClick={() => navigate("/dashboard")} className="secondary-button">
          <Icon name="dashboard" />
          Dashboard
        </button>
      </div>

      {/* Statistics Cards */}
      {!loading && !error && (
        <div className="machines-stats-grid">
          <Card className="stat-card">
            <div className="stat-icon machines">
              <Icon name="machine" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{totalMachines}</div>
              <div className="stat-label">Total Machines</div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-icon models">
              <Icon name="settings" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{totalModels}</div>
              <div className="stat-label">Machine Models</div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-icon issues">
              <Icon name="warning" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{machinesWithIssues}</div>
              <div className="stat-label">Require Attention</div>
            </div>
          </Card>
        </div>
      )}

      {/* Search and Filter Bar */}
      {!loading && !error && machines.length > 0 && (
        <Card className="search-filter-card">
          <div className="search-filter-row">
            <div className="search-box">
              <Icon name="search" />
              <input
                type="text"
                placeholder="Search by model, serial number, or location..."
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
              <label className="filter-label-short">Model:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="filter-select-short"
              >
                <option value="all">All Models</option>
                {machines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      )}

      {loading && (
        <Card className="loading-card">
          <p className="loading-message">Loading machines…</p>
        </Card>
      )}

      {error && (
        <Card className="error-card">
          <p className="error-message">{error}</p>
        </Card>
      )}

      {!loading && !error && machines.length === 0 && (
        <Card className="empty-card">
          <div className="empty-state">
            <Icon name="machine" />
            <p className="empty-state-message">No machines registered yet.</p>
            <p style={{ fontSize: "0.875rem", color: "var(--zoje-text-secondary)", marginTop: "8px" }}>
              Call us at <a href="tel:+8801712345678" className="phone-link" style={{ color: "var(--zoje-primary)" }}>+880-1712-345678</a> to register your machines.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="primary-button"
              style={{ marginTop: "16px" }}
            >
              Contact Support
            </button>
          </div>
        </Card>
      )}

      {/* Machines List - Card View */}
      {!loading && !error && allInstances.length > 0 && (
        <div className="machines-list-view">
          {filteredMachines.map((machine) => (
            <Card key={machine.id} className="machine-model-section">
              <div className="machine-model-header">
                <div className="machine-model-info">
                  <h2 className="machine-model-name">{machine.name || machine.model}</h2>
                  <span className="machine-model-count">
                    {machine.instances.length} {machine.instances.length === 1 ? "machine" : "machines"}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/machines/${machine.id}`)}
                  className="view-model-button"
                >
                  View All <Icon name="add" />
                </button>
              </div>
              <div className="machine-instances-list">
                {machine.instances.map((instance) => (
                  <div
                    key={instance.id}
                    className="machine-instance-row"
                    onClick={() =>
                      navigate(`/machines/details/${instance.serialNumber}`)
                    }
                  >
                    <div className="instance-main-info">
                      <div className="instance-serial-badge">
                        <Icon name="machine" />
                        {instance.serialNumber}
                      </div>
                      {instance.location && (
                        <div className="instance-location">
                          <Icon name="contact" />
                          {instance.location}
                        </div>
                      )}
                    </div>
                    <div className="instance-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/machines/details/${instance.serialNumber}`);
                        }}
                        className="instance-action-button primary"
                      >
                        See Full Info
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/ticket", {
                            state: {
                              modelId: machine.id,
                              serial: instance.serialNumber,
                            },
                          });
                        }}
                        className="instance-action-button secondary"
                      >
                        Report Issue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && !error && allInstances.length === 0 && machines.length > 0 && (
        <Card className="empty-card">
          <div className="empty-state">
            <Icon name="search" />
            <p className="empty-state-message">
              No machines found matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedModel("all");
              }}
              className="secondary-button"
            >
              Clear Filters
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
