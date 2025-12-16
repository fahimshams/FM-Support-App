import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/ProfilePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
export default function ProfilePage() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: "Operator Rahim",
        email: "rahim@example.com",
        phone: "+880-1712-345678",
        companyName: "ABC Garments Ltd.",
        companyAddress: "123 Industrial Area, Dhaka, Bangladesh",
        country: "Bangladesh",
    });
    const [originalData] = useState({ ...profileData });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [touched, setTouched] = useState({});
    const hasChanges = JSON.stringify(profileData) !== JSON.stringify(originalData);
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function validateField(field, value) {
        switch (field) {
            case "name":
                if (!value.trim())
                    return "Name is required";
                break;
            case "email":
                if (!value.trim())
                    return "Email is required";
                if (!validateEmail(value))
                    return "Please enter a valid email address";
                break;
            case "companyName":
                if (!value.trim())
                    return "Company name is required";
                break;
        }
        return undefined;
    }
    function handleBlur(field) {
        setTouched({ ...touched, [field]: true });
        if (field === "name" || field === "email" || field === "companyName") {
            const error = validateField(field, profileData[field]);
            setErrors({ ...errors, [field]: error });
        }
    }
    function handleChange(field, value) {
        setProfileData({ ...profileData, [field]: value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    }
    async function handleSave(e) {
        e.preventDefault();
        // Validate all required fields
        const newErrors = {};
        const nameError = validateField("name", profileData.name);
        const emailError = validateField("email", profileData.email);
        const companyError = validateField("companyName", profileData.companyName);
        if (nameError)
            newErrors.name = nameError;
        if (emailError)
            newErrors.email = emailError;
        if (companyError)
            newErrors.companyName = companyError;
        setErrors(newErrors);
        setTouched({
            name: true,
            email: true,
            companyName: true,
        });
        if (Object.keys(newErrors).length > 0) {
            // Focus on first error field
            const firstErrorField = Object.keys(newErrors)[0];
            document.querySelector(`input[name="${firstErrorField}"]`)?.focus();
            return;
        }
        setSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    }
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "header-row", children: [_jsxs("div", { children: [_jsx("h1", { className: "page-title", children: "Profile & Company Info" }), _jsx("p", { className: "page-subtitle", children: "Manage your personal and company information" })] }), _jsx("button", { onClick: () => navigate("/dashboard"), className: "secondary-button", children: "\u2190 Back to Dashboard" })] }), _jsxs("form", { onSubmit: handleSave, children: [_jsxs("div", { className: "profile-grid", children: [_jsxs(Card, { className: "profile-section-card", children: [_jsx("h2", { className: "card-title", children: "Personal Information" }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label required", children: "Full Name" }), _jsx("input", { type: "text", name: "name", value: profileData.name, onChange: (e) => handleChange("name", e.target.value), onBlur: () => handleBlur("name"), className: `form-input ${touched.name && errors.name ? "error" : ""}`, placeholder: "Enter your full name" }), touched.name && errors.name && (_jsx("div", { className: "error-message", children: errors.name }))] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label required", children: "Email Address" }), _jsx("input", { type: "email", name: "email", value: profileData.email, onChange: (e) => handleChange("email", e.target.value), onBlur: () => handleBlur("email"), className: `form-input ${touched.email && errors.email ? "error" : ""}`, placeholder: "your.email@example.com" }), touched.email && errors.email && (_jsx("div", { className: "error-message", children: errors.email }))] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Phone Number" }), _jsx("input", { type: "tel", name: "phone", value: profileData.phone, onChange: (e) => handleChange("phone", e.target.value), className: "form-input", placeholder: "+880-XXXX-XXXXXX" })] })] }), _jsxs(Card, { className: "profile-section-card", children: [_jsx("h2", { className: "card-title", children: "Company Information" }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label required", children: "Company Name" }), _jsx("input", { type: "text", name: "companyName", value: profileData.companyName, onChange: (e) => handleChange("companyName", e.target.value), onBlur: () => handleBlur("companyName"), className: `form-input ${touched.companyName && errors.companyName ? "error" : ""}`, placeholder: "Enter company name" }), touched.companyName && errors.companyName && (_jsx("div", { className: "error-message", children: errors.companyName }))] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Company Address" }), _jsx("textarea", { name: "companyAddress", rows: 3, value: profileData.companyAddress, onChange: (e) => handleChange("companyAddress", e.target.value), className: "form-textarea", placeholder: "Enter company address" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Country" }), _jsx("input", { type: "text", name: "country", value: profileData.country, onChange: (e) => handleChange("country", e.target.value), className: "form-input", placeholder: "Enter country" })] })] })] }), _jsxs("div", { className: "action-section", children: [hasChanges && (_jsx("div", { className: "unsaved-changes-indicator", children: "You have unsaved changes" })), _jsx("button", { type: "submit", disabled: saving || !hasChanges, className: `primary-button large-button ${saving || !hasChanges ? "disabled" : ""}`, children: saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes" })] })] })] }));
}
//# sourceMappingURL=ProfilePage.js.map