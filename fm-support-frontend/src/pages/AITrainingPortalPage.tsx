// src/pages/AITrainingPortalPage.tsx
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Icon from "../components/Icon";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: "manual" | "troubleshooting" | "maintenance" | "specification" | "general";
  machineModel?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TrainingStatus {
  totalItems: number;
  trainedItems: number;
  lastTrainingDate?: Date;
  status: "idle" | "training" | "completed" | "error";
}

export default function AITrainingPortalPage() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [trainingStatus, setTrainingStatus] = useState<TrainingStatus>({
    totalItems: 0,
    trainedItems: 0,
    status: "idle",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general" as KnowledgeItem["category"],
    machineModel: "",
  });
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

  useEffect(() => {
    loadKnowledgeItems();
    loadTrainingStatus();
  }, []);

  const loadKnowledgeItems = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/ai/knowledge`);
      if (response.ok) {
        const data = await response.json();
        setKnowledgeItems(data.items || []);
      }
    } catch (error) {
      console.error("Error loading knowledge items:", error);
    }
  };

  const loadTrainingStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/ai/training-status`);
      if (response.ok) {
        const data = await response.json();
        setTrainingStatus(data);
      }
    } catch (error) {
      console.error("Error loading training status:", error);
    }
  };

  const handleAddKnowledge = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in title and content");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/ai/knowledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadKnowledgeItems();
        setFormData({ title: "", content: "", category: "general", machineModel: "" });
        setIsAdding(false);
      } else {
        alert("Failed to add knowledge item");
      }
    } catch (error) {
      console.error("Error adding knowledge:", error);
      alert("Error adding knowledge item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this knowledge item?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/ai/knowledge/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadKnowledgeItems();
        await loadTrainingStatus();
      }
    } catch (error) {
      console.error("Error deleting knowledge:", error);
    }
  };

  const handleTrainAI = async () => {
    setTrainingStatus((prev) => ({ ...prev, status: "training" }));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/ai/train`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setTrainingStatus({
          totalItems: data.totalItems,
          trainedItems: data.trainedItems,
          lastTrainingDate: new Date(),
          status: "completed",
        });
        alert(`AI training completed! Trained ${data.trainedItems} items.`);
      } else {
        setTrainingStatus((prev) => ({ ...prev, status: "error" }));
        alert("Training failed. Please try again.");
      }
    } catch (error) {
      console.error("Error training AI:", error);
      setTrainingStatus((prev) => ({ ...prev, status: "error" }));
      alert("Error training AI");
    }
  };

  const categoryColors = {
    manual: "#0066CC",
    troubleshooting: "#E53935",
    maintenance: "#00A651",
    specification: "#FF9800",
    general: "#718096",
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--zoje-text-primary)", marginBottom: "8px" }}>
          AI Training Portal
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--zoje-text-secondary)" }}>
          Manage and train the AI assistant with machine knowledge, manuals, and troubleshooting guides
        </p>
      </div>

      {/* Training Status Card */}
      <Card className="training-status-card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "0.875rem", color: "var(--zoje-text-secondary)", marginBottom: "4px" }}>
              Training Status
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--zoje-text-primary)" }}>
              {trainingStatus.trainedItems} / {trainingStatus.totalItems} Items Trained
            </div>
            {trainingStatus.lastTrainingDate && (
              <div style={{ fontSize: "0.75rem", color: "var(--zoje-text-tertiary)", marginTop: "4px" }}>
                Last trained: {new Date(trainingStatus.lastTrainingDate).toLocaleString()}
              </div>
            )}
          </div>
          <button
            onClick={handleTrainAI}
            disabled={trainingStatus.status === "training" || knowledgeItems.length === 0}
            className="primary-button"
            style={{ minWidth: "150px" }}
          >
            {trainingStatus.status === "training" ? (
              <>
                <Icon name="settings" />
                Training...
              </>
            ) : (
              <>
                <Icon name="settings" />
                Train AI Now
              </>
            )}
          </button>
        </div>
      </Card>

      {/* Add Knowledge Form */}
      {isAdding && (
        <Card className="add-knowledge-card" style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--zoje-text-primary)" }}>Add Knowledge Item</h2>
            <button onClick={() => setIsAdding(false)} className="secondary-button">
              <Icon name="close" />
              Cancel
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--zoje-text-secondary)" }}>
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
                placeholder="e.g., Thread Breaking Troubleshooting Guide"
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--zoje-text-secondary)" }}>
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as KnowledgeItem["category"] })}
                  className="form-input"
                >
                  <option value="general">General</option>
                  <option value="manual">Manual</option>
                  <option value="troubleshooting">Troubleshooting</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="specification">Specification</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--zoje-text-secondary)" }}>
                  Machine Model (Optional)
                </label>
                <input
                  type="text"
                  value={formData.machineModel}
                  onChange={(e) => setFormData({ ...formData, machineModel: e.target.value })}
                  className="form-input"
                  placeholder="e.g., A6000-G"
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--zoje-text-secondary)" }}>
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="form-input"
                rows={8}
                placeholder="Enter detailed information, troubleshooting steps, or instructions..."
              />
            </div>
            <button onClick={handleAddKnowledge} className="primary-button" style={{ alignSelf: "flex-end" }}>
              <Icon name="add" />
              Add Knowledge Item
            </button>
          </div>
        </Card>
      )}

      {/* Knowledge Items List */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--zoje-text-primary)" }}>
            Knowledge Base ({knowledgeItems.length} items)
          </h2>
          {!isAdding && (
            <button onClick={() => setIsAdding(true)} className="primary-button">
              <Icon name="add" />
              Add Knowledge
            </button>
          )}
        </div>

        {knowledgeItems.length === 0 ? (
          <div className="empty-state">
            <Icon name="info" />
            <p>No knowledge items yet. Add your first item to start training the AI.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {knowledgeItems.map((item) => (
              <div
                key={item.id}
                className="knowledge-item-card"
                onClick={() => setSelectedItem(item)}
                style={{
                  padding: "16px",
                  border: "1px solid var(--zoje-border)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          backgroundColor: `${categoryColors[item.category]}20`,
                          color: categoryColors[item.category],
                        }}
                      >
                        {item.category.toUpperCase()}
                      </span>
                      {item.machineModel && (
                        <span style={{ fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }}>
                          {item.machineModel}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--zoje-text-primary)", marginBottom: "4px" }}>
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--zoje-text-secondary)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.content}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="secondary-button"
                    style={{ padding: "8px" }}
                  >
                    <Icon name="close" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedItem(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px",
          }}
        >
          <Card
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "800px", width: "100%", maxHeight: "80vh", overflow: "auto" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--zoje-text-primary)" }}>
                {selectedItem.title}
              </h2>
              <button onClick={() => setSelectedItem(null)} className="secondary-button">
                <Icon name="close" />
              </button>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  backgroundColor: `${categoryColors[selectedItem.category]}20`,
                  color: categoryColors[selectedItem.category],
                  marginRight: "12px",
                }}
              >
                {selectedItem.category.toUpperCase()}
              </span>
              {selectedItem.machineModel && (
                <span style={{ fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }}>
                  Machine: {selectedItem.machineModel}
                </span>
              )}
            </div>
            <div
              style={{
                padding: "16px",
                backgroundColor: "var(--zoje-bg-secondary)",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
                fontSize: "0.9375rem",
                lineHeight: "1.6",
                color: "var(--zoje-text-primary)",
              }}
            >
              {selectedItem.content}
            </div>
            <div style={{ marginTop: "16px", fontSize: "0.75rem", color: "var(--zoje-text-tertiary)" }}>
              Created: {new Date(selectedItem.createdAt).toLocaleString()} | Updated:{" "}
              {new Date(selectedItem.updatedAt).toLocaleString()}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

