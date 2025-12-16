import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/AITrainingPortalPage.tsx
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Icon from "../components/Icon";
export default function AITrainingPortalPage() {
    const [knowledgeItems, setKnowledgeItems] = useState([]);
    const [trainingStatus, setTrainingStatus] = useState({
        totalItems: 0,
        trainedItems: 0,
        status: "idle",
    });
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "general",
        machineModel: "",
    });
    const [selectedItem, setSelectedItem] = useState(null);
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
        }
        catch (error) {
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
        }
        catch (error) {
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
            }
            else {
                alert("Failed to add knowledge item");
            }
        }
        catch (error) {
            console.error("Error adding knowledge:", error);
            alert("Error adding knowledge item");
        }
    };
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this knowledge item?"))
            return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/ai/knowledge/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                await loadKnowledgeItems();
                await loadTrainingStatus();
            }
        }
        catch (error) {
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
            }
            else {
                setTrainingStatus((prev) => ({ ...prev, status: "error" }));
                alert("Training failed. Please try again.");
            }
        }
        catch (error) {
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
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { style: { marginBottom: "24px" }, children: [_jsx("h1", { style: { fontSize: "1.75rem", fontWeight: 700, color: "var(--zoje-text-primary)", marginBottom: "8px" }, children: "AI Training Portal" }), _jsx("p", { style: { fontSize: "0.95rem", color: "var(--zoje-text-secondary)" }, children: "Manage and train the AI assistant with machine knowledge, manuals, and troubleshooting guides" })] }), _jsx(Card, { className: "training-status-card", style: { marginBottom: "24px" }, children: _jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: "0.875rem", color: "var(--zoje-text-secondary)", marginBottom: "4px" }, children: "Training Status" }), _jsxs("div", { style: { fontSize: "1.5rem", fontWeight: 700, color: "var(--zoje-text-primary)" }, children: [trainingStatus.trainedItems, " / ", trainingStatus.totalItems, " Items Trained"] }), trainingStatus.lastTrainingDate && (_jsxs("div", { style: { fontSize: "0.75rem", color: "var(--zoje-text-tertiary)", marginTop: "4px" }, children: ["Last trained: ", new Date(trainingStatus.lastTrainingDate).toLocaleString()] }))] }), _jsx("button", { onClick: handleTrainAI, disabled: trainingStatus.status === "training" || knowledgeItems.length === 0, className: "primary-button", style: { minWidth: "150px" }, children: trainingStatus.status === "training" ? (_jsxs(_Fragment, { children: [_jsx(Icon, { name: "settings" }), "Training..."] })) : (_jsxs(_Fragment, { children: [_jsx(Icon, { name: "settings" }), "Train AI Now"] })) })] }) }), isAdding && (_jsxs(Card, { className: "add-knowledge-card", style: { marginBottom: "24px" }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }, children: [_jsx("h2", { style: { fontSize: "1.25rem", fontWeight: 600, color: "var(--zoje-text-primary)" }, children: "Add Knowledge Item" }), _jsxs("button", { onClick: () => setIsAdding(false), className: "secondary-button", children: [_jsx(Icon, { name: "close" }), "Cancel"] })] }), _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [_jsxs("div", { children: [_jsx("label", { style: { display: "block", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--zoje-text-secondary)" }, children: "Title *" }), _jsx("input", { type: "text", value: formData.title, onChange: (e) => setFormData({ ...formData, title: e.target.value }), className: "form-input", placeholder: "e.g., Thread Breaking Troubleshooting Guide" })] }), _jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }, children: [_jsxs("div", { children: [_jsx("label", { style: { display: "block", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--zoje-text-secondary)" }, children: "Category *" }), _jsxs("select", { value: formData.category, onChange: (e) => setFormData({ ...formData, category: e.target.value }), className: "form-input", children: [_jsx("option", { value: "general", children: "General" }), _jsx("option", { value: "manual", children: "Manual" }), _jsx("option", { value: "troubleshooting", children: "Troubleshooting" }), _jsx("option", { value: "maintenance", children: "Maintenance" }), _jsx("option", { value: "specification", children: "Specification" })] })] }), _jsxs("div", { children: [_jsx("label", { style: { display: "block", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--zoje-text-secondary)" }, children: "Machine Model (Optional)" }), _jsx("input", { type: "text", value: formData.machineModel, onChange: (e) => setFormData({ ...formData, machineModel: e.target.value }), className: "form-input", placeholder: "e.g., A6000-G" })] })] }), _jsxs("div", { children: [_jsx("label", { style: { display: "block", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--zoje-text-secondary)" }, children: "Content *" }), _jsx("textarea", { value: formData.content, onChange: (e) => setFormData({ ...formData, content: e.target.value }), className: "form-input", rows: 8, placeholder: "Enter detailed information, troubleshooting steps, or instructions..." })] }), _jsxs("button", { onClick: handleAddKnowledge, className: "primary-button", style: { alignSelf: "flex-end" }, children: [_jsx(Icon, { name: "add" }), "Add Knowledge Item"] })] })] })), _jsxs(Card, { children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }, children: [_jsxs("h2", { style: { fontSize: "1.25rem", fontWeight: 600, color: "var(--zoje-text-primary)" }, children: ["Knowledge Base (", knowledgeItems.length, " items)"] }), !isAdding && (_jsxs("button", { onClick: () => setIsAdding(true), className: "primary-button", children: [_jsx(Icon, { name: "add" }), "Add Knowledge"] }))] }), knowledgeItems.length === 0 ? (_jsxs("div", { className: "empty-state", children: [_jsx(Icon, { name: "info" }), _jsx("p", { children: "No knowledge items yet. Add your first item to start training the AI." })] })) : (_jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: knowledgeItems.map((item) => (_jsx("div", { className: "knowledge-item-card", onClick: () => setSelectedItem(item), style: {
                                padding: "16px",
                                border: "1px solid var(--zoje-border)",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }, children: _jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }, children: [_jsxs("div", { style: { flex: 1 }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }, children: [_jsx("span", { style: {
                                                            padding: "4px 12px",
                                                            borderRadius: "12px",
                                                            fontSize: "0.75rem",
                                                            fontWeight: 600,
                                                            backgroundColor: `${categoryColors[item.category]}20`,
                                                            color: categoryColors[item.category],
                                                        }, children: item.category.toUpperCase() }), item.machineModel && (_jsx("span", { style: { fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }, children: item.machineModel }))] }), _jsx("h3", { style: { fontSize: "1rem", fontWeight: 600, color: "var(--zoje-text-primary)", marginBottom: "4px" }, children: item.title }), _jsx("p", { style: {
                                                    fontSize: "0.875rem",
                                                    color: "var(--zoje-text-secondary)",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }, children: item.content })] }), _jsx("button", { onClick: (e) => {
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }, className: "secondary-button", style: { padding: "8px" }, children: _jsx(Icon, { name: "close" }) })] }) }, item.id))) }))] }), selectedItem && (_jsx("div", { className: "modal-overlay", onClick: () => setSelectedItem(null), style: {
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
                }, children: _jsxs(Card, { onClick: (e) => e.stopPropagation(), style: { maxWidth: "800px", width: "100%", maxHeight: "80vh", overflow: "auto" }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }, children: [_jsx("h2", { style: { fontSize: "1.5rem", fontWeight: 700, color: "var(--zoje-text-primary)" }, children: selectedItem.title }), _jsx("button", { onClick: () => setSelectedItem(null), className: "secondary-button", children: _jsx(Icon, { name: "close" }) })] }), _jsxs("div", { style: { marginBottom: "16px" }, children: [_jsx("span", { style: {
                                        padding: "4px 12px",
                                        borderRadius: "12px",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        backgroundColor: `${categoryColors[selectedItem.category]}20`,
                                        color: categoryColors[selectedItem.category],
                                        marginRight: "12px",
                                    }, children: selectedItem.category.toUpperCase() }), selectedItem.machineModel && (_jsxs("span", { style: { fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }, children: ["Machine: ", selectedItem.machineModel] }))] }), _jsx("div", { style: {
                                padding: "16px",
                                backgroundColor: "var(--zoje-bg-secondary)",
                                borderRadius: "8px",
                                whiteSpace: "pre-wrap",
                                fontSize: "0.9375rem",
                                lineHeight: "1.6",
                                color: "var(--zoje-text-primary)",
                            }, children: selectedItem.content }), _jsxs("div", { style: { marginTop: "16px", fontSize: "0.75rem", color: "var(--zoje-text-tertiary)" }, children: ["Created: ", new Date(selectedItem.createdAt).toLocaleString(), " | Updated:", " ", new Date(selectedItem.updatedAt).toLocaleString()] })] }) }))] }));
}
//# sourceMappingURL=AITrainingPortalPage.js.map