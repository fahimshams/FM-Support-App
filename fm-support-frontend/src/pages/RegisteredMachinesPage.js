import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/RegisteredMachinesPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMachines, fetchMachineInstances } from "../api";
import Card from "../components/Card";
import Icon from "../components/Icon";
export default function RegisteredMachinesPage() {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedModel, setSelectedModel] = useState("all");
    const navigate = useNavigate();
    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const machinesData = await fetchMachines();
                // Fetch instances for each machine
                const machinesWithInstances = await Promise.all(machinesData.map(async (machine) => {
                    try {
                        const instances = await fetchMachineInstances(machine.id);
                        return { ...machine, instances };
                    }
                    catch (err) {
                        console.warn(`Failed to load instances for ${machine.id}`, err);
                        return { ...machine, instances: [] };
                    }
                }));
                setMachines(machinesWithInstances);
                setError(null);
            }
            catch (err) {
                console.error("Failed to load machines", err);
                setError("Failed to load machines");
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, []);
    // Calculate statistics
    const totalMachines = machines.reduce((sum, m) => sum + m.instances.length, 0);
    const totalModels = machines.length;
    const machinesWithIssues = machines.filter(m => m.instances.some(i => i.location?.toLowerCase().includes("issue"))).length;
    // Filter machines based on search and model
    const filteredMachines = machines.filter((machine) => {
        const matchesSearch = machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            machine.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            machine.instances.some(i => i.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                i.location?.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesModel = selectedModel === "all" || machine.id === selectedModel;
        return matchesSearch && matchesModel;
    });
    const allInstances = filteredMachines.flatMap(m => m.instances.map(i => ({ ...i, machineModel: m.model, machineName: m.name })));
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "header-row", children: [_jsxs("div", { children: [_jsx("h1", { className: "page-title", children: "My Machines" }), _jsx("p", { className: "page-subtitle", children: "Manage and monitor all your registered machinery" })] }), _jsxs("button", { onClick: () => navigate("/dashboard"), className: "secondary-button", children: [_jsx(Icon, { name: "dashboard" }), "Dashboard"] })] }), !loading && !error && (_jsxs("div", { className: "machines-stats-grid", children: [_jsxs(Card, { className: "stat-card", children: [_jsx("div", { className: "stat-icon machines", children: _jsx(Icon, { name: "machine" }) }), _jsxs("div", { className: "stat-content", children: [_jsx("div", { className: "stat-value", children: totalMachines }), _jsx("div", { className: "stat-label", children: "Total Machines" })] })] }), _jsxs(Card, { className: "stat-card", children: [_jsx("div", { className: "stat-icon models", children: _jsx(Icon, { name: "settings" }) }), _jsxs("div", { className: "stat-content", children: [_jsx("div", { className: "stat-value", children: totalModels }), _jsx("div", { className: "stat-label", children: "Machine Models" })] })] }), _jsxs(Card, { className: "stat-card", children: [_jsx("div", { className: "stat-icon issues", children: _jsx(Icon, { name: "warning" }) }), _jsxs("div", { className: "stat-content", children: [_jsx("div", { className: "stat-value", children: machinesWithIssues }), _jsx("div", { className: "stat-label", children: "Require Attention" })] })] })] })), !loading && !error && machines.length > 0 && (_jsx(Card, { className: "search-filter-card", children: _jsxs("div", { className: "search-filter-row", children: [_jsxs("div", { className: "search-box", children: [_jsx(Icon, { name: "search" }), _jsx("input", { type: "text", placeholder: "Search by model, serial number, or location...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input-field" }), searchQuery && (_jsx("button", { onClick: () => setSearchQuery(""), className: "clear-search-button", children: _jsx(Icon, { name: "close" }) }))] }), _jsxs("div", { className: "filter-box", children: [_jsx("label", { className: "filter-label-short", children: "Model:" }), _jsxs("select", { value: selectedModel, onChange: (e) => setSelectedModel(e.target.value), className: "filter-select-short", children: [_jsx("option", { value: "all", children: "All Models" }), machines.map((m) => (_jsx("option", { value: m.id, children: m.model }, m.id)))] })] })] }) })), loading && (_jsx(Card, { className: "loading-card", children: _jsx("p", { className: "loading-message", children: "Loading machines\u2026" }) })), error && (_jsx(Card, { className: "error-card", children: _jsx("p", { className: "error-message", children: error }) })), !loading && !error && machines.length === 0 && (_jsx(Card, { className: "empty-card", children: _jsxs("div", { className: "empty-state", children: [_jsx(Icon, { name: "machine" }), _jsx("p", { className: "empty-state-message", children: "No machines registered yet." }), _jsxs("p", { style: { fontSize: "0.875rem", color: "var(--zoje-text-secondary)", marginTop: "8px" }, children: ["Call us at ", _jsx("a", { href: "tel:+8801712345678", className: "phone-link", style: { color: "var(--zoje-primary)" }, children: "+880-1712-345678" }), " to register your machines."] }), _jsx("button", { onClick: () => navigate("/contact"), className: "primary-button", style: { marginTop: "16px" }, children: "Contact Support" })] }) })), !loading && !error && allInstances.length > 0 && (_jsx("div", { className: "machines-list-view", children: filteredMachines.map((machine) => (_jsxs(Card, { className: "machine-model-section", children: [_jsxs("div", { className: "machine-model-header", children: [_jsxs("div", { className: "machine-model-info", children: [_jsx("h2", { className: "machine-model-name", children: machine.name || machine.model }), _jsxs("span", { className: "machine-model-count", children: [machine.instances.length, " ", machine.instances.length === 1 ? "machine" : "machines"] })] }), _jsxs("button", { onClick: () => navigate(`/machines/${machine.id}`), className: "view-model-button", children: ["View All ", _jsx(Icon, { name: "add" })] })] }), _jsx("div", { className: "machine-instances-list", children: machine.instances.map((instance) => (_jsxs("div", { className: "machine-instance-row", onClick: () => navigate(`/machines/details/${instance.serialNumber}`), children: [_jsxs("div", { className: "instance-main-info", children: [_jsxs("div", { className: "instance-serial-badge", children: [_jsx(Icon, { name: "machine" }), instance.serialNumber] }), instance.location && (_jsxs("div", { className: "instance-location", children: [_jsx(Icon, { name: "contact" }), instance.location] }))] }), _jsxs("div", { className: "instance-actions", children: [_jsx("button", { onClick: (e) => {
                                                    e.stopPropagation();
                                                    navigate(`/machines/details/${instance.serialNumber}`);
                                                }, className: "instance-action-button primary", children: "See Full Info" }), _jsx("button", { onClick: (e) => {
                                                    e.stopPropagation();
                                                    navigate("/ticket", {
                                                        state: {
                                                            modelId: machine.id,
                                                            serial: instance.serialNumber,
                                                        },
                                                    });
                                                }, className: "instance-action-button secondary", children: "Report Issue" })] })] }, instance.id))) })] }, machine.id))) })), !loading && !error && allInstances.length === 0 && machines.length > 0 && (_jsx(Card, { className: "empty-card", children: _jsxs("div", { className: "empty-state", children: [_jsx(Icon, { name: "search" }), _jsx("p", { className: "empty-state-message", children: "No machines found matching your search criteria." }), _jsx("button", { onClick: () => {
                                setSearchQuery("");
                                setSelectedModel("all");
                            }, className: "secondary-button", children: "Clear Filters" })] }) }))] }));
}
//# sourceMappingURL=RegisteredMachinesPage.js.map