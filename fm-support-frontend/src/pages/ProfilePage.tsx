// src/pages/ProfilePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  companyAddress: string;
  country: string;
};

type Errors = {
  name?: string;
  email?: string;
  companyName?: string;
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Operator Rahim",
    email: "rahim@example.com",
    phone: "+880-1712-345678",
    companyName: "ABC Garments Ltd.",
    companyAddress: "123 Industrial Area, Dhaka, Bangladesh",
    country: "Bangladesh",
  });
  const [originalData] = useState<ProfileData>({ ...profileData });
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const hasChanges = JSON.stringify(profileData) !== JSON.stringify(originalData);

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateField(field: keyof Errors, value: string): string | undefined {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;
      case "companyName":
        if (!value.trim()) return "Company name is required";
        break;
    }
    return undefined;
  }

  function handleBlur(field: keyof ProfileData) {
    setTouched({ ...touched, [field]: true });
    if (field === "name" || field === "email" || field === "companyName") {
      const error = validateField(field, profileData[field]);
      setErrors({ ...errors, [field]: error });
    }
  }

  function handleChange(field: keyof ProfileData, value: string) {
    setProfileData({ ...profileData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field as keyof Errors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    // Validate all required fields
    const newErrors: Errors = {};
    const nameError = validateField("name", profileData.name);
    const emailError = validateField("email", profileData.email);
    const companyError = validateField("companyName", profileData.companyName);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (companyError) newErrors.companyName = companyError;

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      companyName: true,
    });

    if (Object.keys(newErrors).length > 0) {
      // Focus on first error field
      const firstErrorField = Object.keys(newErrors)[0];
      document.querySelector<HTMLInputElement>(`input[name="${firstErrorField}"]`)?.focus();
      return;
    }

    setSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="page-container">
      <div className="header-row">
        <div>
          <h1 className="page-title">Profile & Company Info</h1>
          <p className="page-subtitle">
            Manage your personal and company information
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="secondary-button"
        >
          ← Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSave}>
        <div className="profile-grid">
          {/* Personal Information */}
          <Card className="profile-section-card">
            <h2 className="card-title">Personal Information</h2>
            <div className="form-group">
              <label className="form-label required">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                className={`form-input ${touched.name && errors.name ? "error" : ""}`}
                placeholder="Enter your full name"
              />
              {touched.name && errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label required">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`form-input ${touched.email && errors.email ? "error" : ""}`}
                placeholder="your.email@example.com"
              />
              {touched.email && errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="form-input"
                placeholder="+880-XXXX-XXXXXX"
              />
            </div>
          </Card>

          {/* Company Information */}
          <Card className="profile-section-card">
            <h2 className="card-title">Company Information</h2>
            <div className="form-group">
              <label className="form-label required">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={profileData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                onBlur={() => handleBlur("companyName")}
                className={`form-input ${touched.companyName && errors.companyName ? "error" : ""}`}
                placeholder="Enter company name"
              />
              {touched.companyName && errors.companyName && (
                <div className="error-message">{errors.companyName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Company Address
              </label>
              <textarea
                name="companyAddress"
                rows={3}
                value={profileData.companyAddress}
                onChange={(e) => handleChange("companyAddress", e.target.value)}
                className="form-textarea"
                placeholder="Enter company address"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={profileData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="form-input"
                placeholder="Enter country"
              />
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="action-section">
          {hasChanges && (
            <div className="unsaved-changes-indicator">
              You have unsaved changes
            </div>
          )}
          <button
            type="submit"
            disabled={saving || !hasChanges}
            className={`primary-button large-button ${saving || !hasChanges ? "disabled" : ""}`}
          >
            {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
