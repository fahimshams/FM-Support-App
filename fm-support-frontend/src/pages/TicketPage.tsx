// src/pages/TicketPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createTicket, fetchMachines, fetchMachineInstances } from "../api";
import type { IssueType, Machine, MachineInstance } from "../types";
import Card from "../components/Card";
import Icon from "../components/Icon";

type TicketLocationState = {
  modelId?: string;
  serial?: string;
  machineImage?: string;
};

export default function TicketPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { modelId, serial } = (location.state || {}) as TicketLocationState;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [machines, setMachines] = useState<Machine[]>([]);
  const [machineInstances, setMachineInstances] = useState<MachineInstance[]>([]);
  const [selectedMachineId, setSelectedMachineId] = useState<string>("");
  const [selectedSerialNumber, setSelectedSerialNumber] = useState<string>(serial || "");
  const [issueType, setIssueType] = useState<IssueType | "">("");
  const [description, setDescription] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{
    machine?: string;
    issueType?: string;
    description?: string;
    files?: string;
  }>({});
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
        } else if (machinesData.length > 0) {
          setSelectedMachineId(machinesData[0].id);
          loadInstances(machinesData[0].id);
        }
      } catch (err) {
        console.error("Failed to load machines", err);
      }
    }
    loadMachines();
  }, []);

  async function loadInstances(machineId: string) {
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
      } else if (instances.length > 0) {
        setSelectedSerialNumber(instances[0].serialNumber);
      }
    } catch (err) {
      console.error("Failed to load instances", err);
      setMachineInstances([]);
    }
  }

  function handleMachineChange(machineId: string) {
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

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles: File[] = [];
    const fileErrors: string[] = [];

    files.forEach((file) => {
      if (file.size > maxSize) {
        fileErrors.push(`${file.name} exceeds 5MB limit`);
      } else {
        validFiles.push(file);
      }
    });

    if (fileErrors.length > 0) {
      setErrors({ ...errors, files: fileErrors.join(", ") });
    } else {
      setErrors({ ...errors, files: undefined });
      setAttachedFiles([...attachedFiles, ...validFiles]);
    }
  }

  function removeFile(index: number) {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};

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
      document.querySelector<HTMLSelectElement>('select[name="machine"]')?.focus();
      return false;
    }
    if (newErrors.issueType) {
      document.querySelector<HTMLSelectElement>('select[name="issueType"]')?.focus();
      return false;
    }
    if (newErrors.description) {
      document.querySelector<HTMLTextAreaElement>('textarea[name="description"]')?.focus();
      return false;
    }

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
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
        issueType: issueType as IssueType,
        description: `[Serial: ${selectedSerialNumber}] ${description}`,
      };

      await createTicket(payload);
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/tickets/history");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setErrors({ description: "Failed to create ticket. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    navigate("/dashboard");
  }

  if (success) {
    return (
      <div className="page-container">
        <Card className="success-card">
          <div className="success-content">
            <Icon name="check" />
            <h2 className="success-title">Problem Reported Successfully!</h2>
            <p className="success-message">Our technician will contact you within 2 hours. Redirecting to your tickets...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="header-row">
        <div>
          <h1 className="page-title">Report a Problem</h1>
          <p className="page-subtitle">Tell us what's wrong with your machine and we'll help you fix it</p>
        </div>
        <button onClick={handleCancel} className="secondary-button">
          Cancel
        </button>
      </div>

      <Card className="ticket-form-card">
        <form onSubmit={handleSubmit}>
          {/* Machine Selection */}
          <div className="form-group">
            <label className="form-label required">
              Machine
            </label>
            <select
              name="machine"
              value={selectedMachineId}
              onChange={(e) => handleMachineChange(e.target.value)}
              className={`form-select ${errors.machine ? "error" : ""}`}
            >
              <option value="">Select a machine</option>
              {machines.map((machine) => (
                <option key={machine.id} value={machine.id}>
                  {machine.model} - {machine.name}
                </option>
              ))}
            </select>
            {errors.machine && (
              <div className="error-message">{errors.machine}</div>
            )}
          </div>

          {/* Serial Number Selection */}
          {selectedMachineId && machineInstances.length > 0 && (
            <div className="form-group">
              <label className="form-label required">
                Serial Number
              </label>
              <select
                value={selectedSerialNumber}
                onChange={(e) => setSelectedSerialNumber(e.target.value)}
                className={`form-select ${errors.machine ? "error" : ""}`}
              >
                <option value="">Select serial number</option>
                {machineInstances.map((instance) => (
                  <option key={instance.id} value={instance.serialNumber}>
                    {instance.serialNumber}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Issue Type */}
          <div className="form-group">
            <label className="form-label required">
              What's the Problem?
            </label>
            <select
              name="issueType"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as IssueType)}
              className={`form-select ${errors.issueType ? "error" : ""}`}
            >
              <option value="">Select the problem type</option>
              <option value="THREAD_BREAKING">Thread Breaking - Machine keeps breaking thread while sewing</option>
              <option value="STITCH_SKIPPING">Stitch Skipping - Machine is missing stitches</option>
              <option value="FABRIC_NOT_FEEDING">Fabric Not Feeding - Material is not moving through machine</option>
            </select>
            {errors.issueType && (
              <div className="error-message">{errors.issueType}</div>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label required">
              Describe the Problem
            </label>
            <textarea
              name="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about what's happening with your machine..."
              className={`form-textarea ${errors.description ? "error" : ""}`}
            />
            <div className="form-help-text" style={{ marginTop: "8px", fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }}>
              <strong>Helpful information to include:</strong>
              <ul style={{ margin: "8px 0 0 20px" }}>
                <li>When did the problem start?</li>
                <li>What were you doing when it happened?</li>
                <li>How often does it occur?</li>
                <li>Any unusual sounds or error messages?</li>
              </ul>
            </div>
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </div>

          {/* Attach Images */}
          <div className="form-group">
            <label className="form-label">
              Add Photos (Optional but Helpful)
            </label>
            <div className="form-help-text" style={{ marginBottom: "12px", fontSize: "0.875rem", color: "var(--zoje-text-secondary)" }}>
              Take photos of: the problem area, any error messages, and the machine label/serial number
            </div>
            <div className="file-upload-area">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="file-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="file-upload-button"
              >
                <Icon name="upload" />
                Choose Photos
              </button>
              <span className="file-upload-hint">Max 5MB per file</span>
            </div>
            {errors.files && (
              <div className="error-message">{errors.files}</div>
            )}
            {attachedFiles.length > 0 && (
              <div className="attached-files-list">
                {attachedFiles.map((file, index) => (
                  <div key={index} className="attached-file-item">
                    <Icon name="document" />
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="remove-file-button"
                    >
                      <Icon name="close" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="secondary-button"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
