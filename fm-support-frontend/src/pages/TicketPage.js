import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/TicketPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createTicket, fetchMachines, fetchMachineInstances } from "../api";
import Card from "../components/Card";
import Icon from "../components/Icon";
export default function TicketPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { modelId, serial } = (location.state || {});
    const fileInputRef = useRef(null);
    const [machines, setMachines] = useState([]);
    const [machineInstances, setMachineInstances] = useState([]);
    const [selectedMachineId, setSelectedMachineId] = useState("");
    const [selectedSerialNumber, setSelectedSerialNumber] = useState(serial || "");
    const [issueType, setIssueType] = useState("");
    const [description, setDescription] = useState("");
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        async function loadMachines() {
            try {
                const machinesData = await fetchMachines();
                setMachines(machinesData);
                // If modelId is provided, try to find and select it
                if (modelId) {
                    const matchingMachine = machinesData.find(m => m.id === modelId);
                    if (matchingMachine) {
                        setSelectedMachineId(matchingMachine.id);
                        loadInstances(matchingMachine.id);
                    }
                }
                else if (machinesData.length > 0) {
                    setSelectedMachineId(machinesData[0].id);
                    loadInstances(machinesData[0].id);
                }
            }
            catch (err) {
                console.error("Failed to load machines", err);
            }
        }
        loadMachines();
    }, []);
    async function loadInstances(machineId) {
        if (!machineId || machineId.trim() === "") {
            console.warn("Cannot load instances: machineId is empty");
            setMachineInstances([]);
            return;
        }
        try {
            const instances = await fetchMachineInstances(machineId);
            setMachineInstances(instances);
            if (serial && instances.find(i => i.serialNumber === serial)) {
                setSelectedSerialNumber(serial);
            }
            else if (instances.length > 0) {
                setSelectedSerialNumber(instances[0].serialNumber);
            }
        }
        catch (err) {
            console.error("Failed to load instances", err);
            setMachineInstances([]);
        }
    }
    function handleMachineChange(machineId) {
        if (!machineId || machineId.trim() === "") {
            setSelectedMachineId("");
            setSelectedSerialNumber("");
            setMachineInstances([]);
            return;
        }
        setSelectedMachineId(machineId);
        setSelectedSerialNumber("");
        loadInstances(machineId);
    }
    function handleFileSelect(e) {
        const files = Array.from(e.target.files || []);
        const maxSize = 5 * 1024 * 1024; // 5MB
        const validFiles = [];
        const fileErrors = [];
        files.forEach((file) => {
            if (file.size > maxSize) {
                fileErrors.push(`${file.name} exceeds 5MB limit`);
            }
            else {
                validFiles.push(file);
            }
        });
        if (fileErrors.length > 0) {
            setErrors({ ...errors, files: fileErrors.join(", ") });
        }
        else {
            setErrors({ ...errors, files: undefined });
            setAttachedFiles([...attachedFiles, ...validFiles]);
        }
    }
    function removeFile(index) {
        setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
    }
    function validate() {
        const newErrors = {};
        if (!selectedMachineId) {
            newErrors.machine = "Please select a machine";
        }
        if (!selectedSerialNumber) {
            newErrors.machine = "Please select a serial number";
        }
        if (!issueType) {
            newErrors.issueType = "Please select an issue type";
        }
        if (!description.trim()) {
            newErrors.description = "Please provide a description";
        }
        setErrors(newErrors);
        // Focus on first empty field
        if (newErrors.machine) {
            document.querySelector('select[name="machine"]')?.focus();
            return false;
        }
        if (newErrors.issueType) {
            document.querySelector('select[name="issueType"]')?.focus();
            return false;
        }
        if (newErrors.description) {
            document.querySelector('textarea[name="description"]')?.focus();
            return false;
        }
        return Object.keys(newErrors).length === 0;
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            setSubmitting(true);
            setErrors({});
            const payload = {
                machineId: selectedMachineId,
                createdByUserId: "u1", // Mock user ID
                issueType: issueType,
                description: `[Serial: ${selectedSerialNumber}] ${description}`,
            };
            await createTicket(payload);
            setSuccess(true);
            // Redirect after 2 seconds
            setTimeout(() => {
                navigate("/tickets/history");
            }, 2000);
        }
        catch (err) {
            console.error(err);
            setErrors({ description: "Failed to create ticket. Please try again." });
        }
        finally {
            setSubmitting(false);
        }
    }
    function handleCancel() {
        navigate("/dashboard");
    }
    if (success) {
        return (_jsx("div", { className: "page-container", children: _jsx(Card, { className: "success-card", children: _jsxs("div", { className: "success-content", children: [_jsx(Icon, { name: "check" }), _jsx("h2", { className: "success-title", children: "Problem Reported Successfully!" }), _jsx("p", { className: "success-message", children: "Our technician will contact you within 2 hours. Redirecting to your tickets..." })] }) }) }));
    }
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "header-row", children: [_jsxs("div", { children: [_jsx("h1", { className: "page-title", children: "Report a Problem" }), _jsx("p", { className: "page-subtitle", children: "Tell us what's wrong with your machine and we'll help you fix it" })] }), _jsx("button", { onClick: handleCancel, className: "secondary-button", children: "Cancel" })] }), _jsx(Card, { className: "ticket-form-card", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label required", children: "Machine" }), _jsxs("select", { name: "machine", value: selectedMachineId, onChange: (e) => handleMachineChange(e.target.value), className: `form-select ${errors.machine ? "error" : ""}`, children: [_jsx("option", { value: "", children: "Select a machine" }), machines.map((machine) => (_jsxs("option", { value: machine.id, children: [machine.model, " - ", machine.name] }, machine.id)))] }), errors.machine && (_jsx("div", { className: "error-message", children: errors.machine }))] }), selectedMachineId && machineInstances.length > 0 && (_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label required", children: "Serial Number" }), _jsxs("select", { value: selectedSerialNumber, onChange: (e) => setSelectedSerialNumber(e.target.value), className: `form-select ${errors.machine ? "error" : ""}`, children: [_jsx("option", { value: "", children: "Select serial number" }), machineInstances.map((instance) => (_jsx("option", { value: instance.serialNumber, children: instance.serialNumber }, instance.id)))] })] })), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label required", children: "What's the Problem?" }), _jsxs("select", { name: "issueType", value: issueType, onChange: (e) => setIssueType(e.target.value), className: `form-select ${errors.issueType ? "error" : ""}`, children: [_jsx("option", { value: "", children: "Select the problem type" }), _jsx("option", { value: "THREAD_BREAKING", children: "Thread Breaking - Machine keeps breaking thread while sewing" }), _jsx("option", { value: "STITCH_SKIPPING", children: "Stitch Skipping - Machine is missing stitches" }), _jsx("option", { value: "FABRIC_NOT_FEEDING", children: "Fabric Not Feeding - Material is not moving through machine" })] }), errors.issueType && (_jsx("div", { className: "error-message", children: errors.issueType }))] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label required", children: "Describe the Problem" }), _jsx("textarea", { name: "description", rows: 5, value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Tell us more about what's happening with your machine...", className: `form-textarea ${errors.description ? "error" : ""}` }), _jsxs("div", { className: "form-help-text", style: { marginTop: "8px", fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }, children: [_jsx("strong", { children: "Helpful information to include:" }), _jsxs("ul", { style: { margin: "8px 0 0 20px" }, children: [_jsx("li", { children: "When did the problem start?" }), _jsx("li", { children: "What were you doing when it happened?" }), _jsx("li", { children: "How often does it occur?" }), _jsx("li", { children: "Any unusual sounds or error messages?" })] })] }), errors.description && (_jsx("div", { className: "error-message", children: errors.description }))] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Add Photos (Optional but Helpful)" }), _jsx("div", { className: "form-help-text", style: { marginBottom: "12px", fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }, children: "Take photos of: the problem area, any error messages, and the machine label/serial number" }), _jsxs("div", { className: "file-upload-area", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", multiple: true, onChange: handleFileSelect, className: "file-input" }), _jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "file-upload-button", children: [_jsx(Icon, { name: "upload" }), "Choose Photos"] }), _jsx("span", { className: "file-upload-hint", children: "Max 5MB per file" })] }), errors.files && (_jsx("div", { className: "error-message", children: errors.files })), attachedFiles.length > 0 && (_jsx("div", { className: "attached-files-list", children: attachedFiles.map((file, index) => (_jsxs("div", { className: "attached-file-item", children: [_jsx(Icon, { name: "document" }), _jsx("span", { className: "file-name", children: file.name }), _jsxs("span", { className: "file-size", children: ["(", (file.size / 1024).toFixed(1), " KB)"] }), _jsx("button", { type: "button", onClick: () => removeFile(index), className: "remove-file-button", children: _jsx(Icon, { name: "close" }) })] }, index))) }))] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "button", onClick: handleCancel, className: "secondary-button", disabled: submitting, children: "Cancel" }), _jsx("button", { type: "submit", className: "primary-button", disabled: submitting, children: submitting ? "Submitting..." : "Submit Report" })] })] }) })] }));
}
//# sourceMappingURL=TicketPage.js.map