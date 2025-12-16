import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/MachineDetailsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchMachines, fetchMachineInstances, fetchTickets } from "../api";
import Card from "../components/Card";
import { resolveImageUrl } from "../utils/imageUtils";
import { machineryData } from "../data/models";
import Icon from "../components/Icon";
export default function MachineDetailsPage() {
    const { serialNumber } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [instance, setInstance] = useState(null);
    const [machine, setMachine] = useState(null);
    const [serviceHistory, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const machines = await fetchMachines();
                let found = null;
                let machineModel = null;
                for (const machine of machines) {
                    try {
                        const instances = await fetchMachineInstances(machine.id);
                        const matchingInstance = instances.find((mi) => mi.serialNumber === serialNumber);
                        if (matchingInstance) {
                            found = matchingInstance;
                            machineModel = machine;
                            break;
                        }
                    }
                    catch (err) {
                        console.warn(`Failed to fetch instances for ${machine.id}`, err);
                    }
                }
                if (!found || !machineModel) {
                    setError("Machine not found");
                    return;
                }
                setInstance(found);
                const machineData = machineryData.find((m) => m.id === machineModel.id || m.name.includes(machineModel.model));
                setMachine(machineData);
                const tickets = await fetchTickets();
                const history = tickets.filter((t) => t.machineSerial === serialNumber ||
                    t.serialNumber === serialNumber ||
                    t.machineId === found.machineId);
                setServiceHistory(history);
            }
            catch (err) {
                console.error("Failed to load machine details", err);
                setError("Failed to load machine details");
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, [serialNumber]);
    if (loading) {
        return (_jsx("div", { className: "page-container", children: _jsx("p", { className: "loading-message", children: "Loading machine details..." }) }));
    }
    if (error || !instance) {
        return (_jsxs("div", { className: "page-container", children: [_jsx("p", { className: "error-message", children: error || "Machine not found" }), _jsx("button", { onClick: () => navigate("/machines/registered"), className: "primary-button", children: "Back to My Machines" })] }));
    }
    // Mock data for warranty and technician
    const purchaseDate = new Date("2024-01-15");
    const warrantyStart = purchaseDate;
    const warrantyEnd = new Date(purchaseDate);
    warrantyEnd.setFullYear(warrantyEnd.getFullYear() + 1);
    const today = new Date();
    const warrantyProgress = Math.min(100, Math.max(0, ((today.getTime() - warrantyStart.getTime()) /
        (warrantyEnd.getTime() - warrantyStart.getTime())) *
        100));
    const isWarrantyActive = today < warrantyEnd;
    const assignedTechnician = {
        name: "Ahmed Hassan",
        phone: "+880-1712-345678",
    };
    const currentStatus = "Operational";
    const imageUrl = resolveImageUrl(machine?.image);
    return (_jsxs("div", { className: "page-container", children: [_jsxs("nav", { className: "breadcrumb", children: [_jsx(Link, { to: "/dashboard", className: "breadcrumb-link", children: "Dashboard" }), _jsx("span", { className: "breadcrumb-separator", children: "\u203A" }), _jsx(Link, { to: "/machines/registered", className: "breadcrumb-link", children: "Machines" }), _jsx("span", { className: "breadcrumb-separator", children: "\u203A" }), _jsx("span", { className: "breadcrumb-current", children: "Machine Details" })] }), _jsxs("div", { className: "machine-details-header", children: [_jsxs("div", { children: [_jsx("h1", { className: "page-title", children: machine?.name || "Machine Model" }), _jsxs("p", { className: "page-subtitle", children: ["Serial Number: ", instance.serialNumber] })] }), _jsx("button", { onClick: () => navigate("/machines/registered"), className: "secondary-button", children: "\u2190 Back to Machines" })] }), _jsx(Card, { className: "tabs-nav-card", children: _jsxs("nav", { className: "tabs-nav", children: [_jsxs("button", { className: `tab-nav-button ${activeTab === "overview" ? "active" : ""}`, onClick: () => setActiveTab("overview"), children: [_jsx(Icon, { name: "dashboard" }), _jsx("span", { children: "Overview" })] }), _jsxs("button", { className: `tab-nav-button ${activeTab === "warranty" ? "active" : ""}`, onClick: () => setActiveTab("warranty"), children: [_jsx(Icon, { name: "check" }), _jsx("span", { children: "Warranty" })] }), _jsxs("button", { className: `tab-nav-button ${activeTab === "history" ? "active" : ""}`, onClick: () => setActiveTab("history"), children: [_jsx(Icon, { name: "history" }), _jsx("span", { children: "Service History" })] }), _jsxs("button", { className: `tab-nav-button ${activeTab === "manuals" ? "active" : ""}`, onClick: () => setActiveTab("manuals"), children: [_jsx(Icon, { name: "document" }), _jsx("span", { children: "Manuals" })] })] }) }), _jsxs(Card, { className: "tab-content-card", children: [activeTab === "overview" && (_jsxs("div", { className: "overview-tab", children: [_jsxs("div", { className: "overview-grid", children: [_jsxs("div", { className: "overview-item", children: [_jsx("label", { className: "overview-label", children: "Installation Date" }), _jsx("div", { className: "overview-value", children: purchaseDate.toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }) })] }), _jsxs("div", { className: "overview-item", children: [_jsx("label", { className: "overview-label", children: "Current Status" }), _jsx("div", { className: "overview-value", children: _jsx("span", { className: `status-badge status-${currentStatus.toLowerCase()}`, children: currentStatus }) })] }), _jsxs("div", { className: "overview-item", children: [_jsx("label", { className: "overview-label", children: "Assigned Technician" }), _jsx("div", { className: "overview-value", children: _jsxs("div", { className: "technician-info", children: [_jsx("div", { className: "technician-name", children: assignedTechnician.name }), _jsxs("div", { className: "technician-phone", children: [_jsx(Icon, { name: "phone" }), assignedTechnician.phone] })] }) })] })] }), imageUrl && (_jsx("div", { className: "machine-image-container", children: _jsx("img", { src: imageUrl, alt: machine?.name || "Machine", className: "machine-details-image" }) }))] })), activeTab === "warranty" && (_jsxs("div", { className: "warranty-tab", children: [_jsxs("div", { className: "warranty-info-grid", children: [_jsxs("div", { className: "warranty-item", children: [_jsx("label", { className: "warranty-label", children: "Warranty Start Date" }), _jsx("div", { className: "warranty-value", children: warrantyStart.toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }) })] }), _jsxs("div", { className: "warranty-item", children: [_jsx("label", { className: "warranty-label", children: "Warranty End Date" }), _jsx("div", { className: "warranty-value", children: warrantyEnd.toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }) })] }), _jsxs("div", { className: "warranty-item", children: [_jsx("label", { className: "warranty-label", children: "Warranty Status" }), _jsx("div", { className: "warranty-value", children: _jsx("span", { className: `warranty-status-badge ${isWarrantyActive ? "active" : "expired"}`, children: isWarrantyActive ? "✓ Active" : "✗ Expired" }) })] })] }), _jsxs("div", { className: "warranty-progress-section", children: [_jsx("label", { className: "warranty-progress-label", children: "Warranty Period Progress" }), _jsx("div", { className: "warranty-progress-bar-container", children: _jsx("div", { className: `warranty-progress-bar ${isWarrantyActive ? "active" : "expired"}`, style: { width: `${warrantyProgress}%` } }) }), _jsxs("div", { className: "warranty-progress-text", children: [warrantyProgress.toFixed(1), "% of warranty period elapsed"] })] })] })), activeTab === "history" && (_jsx("div", { className: "history-tab", children: serviceHistory.length === 0 ? (_jsx("div", { className: "empty-state", children: _jsx("p", { className: "empty-state-message", children: "No service history available" }) })) : (_jsx("div", { className: "service-history-timeline", children: serviceHistory.map((ticket, index) => (_jsxs("div", { className: "timeline-item", children: [_jsx("div", { className: "timeline-marker" }), _jsxs("div", { className: "timeline-content", children: [_jsxs("div", { className: "timeline-header", children: [_jsxs("div", { className: "timeline-title", children: ["Ticket #", ticket.id, " - ", ticket.issueType] }), _jsx("span", { className: `status-badge status-${ticket.status.toLowerCase().replace("_", "-")}`, children: ticket.status === "OPEN"
                                                            ? "Open"
                                                            : ticket.status === "IN_PROGRESS"
                                                                ? "In Progress"
                                                                : "Closed" })] }), _jsx("div", { className: "timeline-description", children: ticket.description }), _jsxs("div", { className: "timeline-meta", children: [_jsxs("span", { className: "timeline-date", children: ["Created: ", new Date(ticket.createdAt).toLocaleDateString()] }), ticket.technicianId && (_jsxs("span", { className: "timeline-technician", children: ["Technician: ", ticket.technicianId] }))] })] })] }, ticket.id))) })) })), activeTab === "manuals" && (_jsxs("div", { className: "manuals-tab", children: [_jsx("h3", { className: "manuals-title", children: "Available Documentation" }), _jsxs("div", { className: "manuals-list", children: [_jsxs("a", { href: "#", className: "manual-download-link", onClick: (e) => {
                                            e.preventDefault();
                                            alert("User Manual download would be available here");
                                        }, children: [_jsx(Icon, { name: "document" }), _jsxs("div", { className: "manual-link-content", children: [_jsx("div", { className: "manual-link-title", children: "User Manual" }), _jsx("div", { className: "manual-link-subtitle", children: "PDF \u2022 2.5 MB" })] }), _jsx(Icon, { name: "download" })] }), _jsxs("a", { href: "#", className: "manual-download-link", onClick: (e) => {
                                            e.preventDefault();
                                            alert("Maintenance Guide download would be available here");
                                        }, children: [_jsx(Icon, { name: "document" }), _jsxs("div", { className: "manual-link-content", children: [_jsx("div", { className: "manual-link-title", children: "Maintenance Guide" }), _jsx("div", { className: "manual-link-subtitle", children: "PDF \u2022 1.8 MB" })] }), _jsx(Icon, { name: "download" })] }), _jsxs("a", { href: "#", className: "manual-download-link", onClick: (e) => {
                                            e.preventDefault();
                                            alert("Troubleshooting Guide download would be available here");
                                        }, children: [_jsx(Icon, { name: "document" }), _jsxs("div", { className: "manual-link-content", children: [_jsx("div", { className: "manual-link-title", children: "Troubleshooting Guide" }), _jsx("div", { className: "manual-link-subtitle", children: "PDF \u2022 1.2 MB" })] }), _jsx(Icon, { name: "download" })] }), _jsxs("a", { href: "#", className: "manual-download-link", onClick: (e) => {
                                            e.preventDefault();
                                            alert("Parts Catalog download would be available here");
                                        }, children: [_jsx(Icon, { name: "document" }), _jsxs("div", { className: "manual-link-content", children: [_jsx("div", { className: "manual-link-title", children: "Parts Catalog" }), _jsx("div", { className: "manual-link-subtitle", children: "PDF \u2022 3.1 MB" })] }), _jsx(Icon, { name: "download" })] })] })] }))] }), _jsx("div", { className: "action-section", children: _jsx("button", { onClick: () => navigate("/ticket", {
                        state: {
                            modelId: machine?.id,
                            serial: instance.serialNumber,
                            machineImage: imageUrl,
                        },
                    }), className: "primary-button large-button", children: "Report a Problem" }) })] }));
}
//# sourceMappingURL=MachineDetailsPage.js.map