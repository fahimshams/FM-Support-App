import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/ContactSupportPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
export default function ContactSupportPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmitting(false);
        setSubmitted(true);
    };
    if (submitted) {
        return (_jsx("div", { className: "page-container", children: _jsxs(Card, { className: "success-card", children: [_jsx("div", { className: "success-icon", children: "\u2713" }), _jsx("h2", { className: "card-title", children: "Message Sent Successfully!" }), _jsx("p", { className: "page-subtitle", children: "Our support team will get back to you within 24 hours." }), _jsx("button", { onClick: () => {
                            setSubmitted(false);
                            setFormData({
                                name: "",
                                email: "",
                                phone: "",
                                subject: "",
                                message: "",
                            });
                        }, className: "primary-button", children: "Send Another Message" }), _jsx("button", { onClick: () => navigate("/dashboard"), className: "secondary-button", style: { marginLeft: "12px" }, children: "Back to Dashboard" })] }) }));
    }
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "header-row", children: [_jsxs("div", { children: [_jsx("h1", { className: "page-title", children: "Contact Support" }), _jsx("p", { className: "page-subtitle", children: "Get in touch with our support team for assistance" })] }), _jsx("button", { onClick: () => navigate("/dashboard"), className: "secondary-button", children: "\u2190 Back to Dashboard" })] }), _jsxs("div", { className: "contact-grid", children: [_jsxs(Card, { className: "contact-info-card", children: [_jsx("h2", { className: "card-title", children: "Support Information" }), _jsx("p", { style: { fontSize: "0.875rem", color: "var(--zoje-text-secondary)", marginBottom: "20px" }, children: "We typically respond within 2 hours during business hours. For urgent issues, call us directly." }), _jsxs("div", { className: "contact-info-list", children: [_jsxs("div", { className: "contact-info-item", children: [_jsx("div", { className: "contact-info-icon", children: "\uD83D\uDCDE" }), _jsxs("div", { children: [_jsx("strong", { children: "Phone" }), _jsx("p", { children: _jsx("a", { href: "tel:+8801712345678", className: "phone-link", style: { color: "var(--zoje-primary)", textDecoration: "none" }, children: "+880-1712-345678" }) }), _jsx("a", { href: "tel:+8801712345678", className: "primary-button", style: { marginTop: "8px", display: "inline-block", fontSize: "0.875rem", padding: "8px 16px" }, children: "\uD83D\uDCDE Call Now" })] })] }), _jsxs("div", { className: "contact-info-item", children: [_jsx("div", { className: "contact-info-icon", children: "\u2709\uFE0F" }), _jsxs("div", { children: [_jsx("strong", { children: "Email" }), _jsx("p", { children: _jsx("a", { href: "mailto:support@zojebd.com", className: "phone-link", style: { color: "var(--zoje-primary)", textDecoration: "none" }, children: "support@zojebd.com" }) })] })] }), _jsxs("div", { className: "contact-info-item", children: [_jsx("div", { className: "contact-info-icon", children: "\uD83D\uDCCD" }), _jsxs("div", { children: [_jsx("strong", { children: "Address" }), _jsx("p", { children: "Dhaka, Bangladesh" })] })] }), _jsxs("div", { className: "contact-info-item", children: [_jsx("div", { className: "contact-info-icon", children: "\uD83D\uDD50" }), _jsxs("div", { children: [_jsx("strong", { children: "Business Hours" }), _jsx("p", { children: "Sunday - Thursday: 9:00 AM - 6:00 PM" }), _jsx("p", { children: "Friday: 9:00 AM - 1:00 PM" })] })] })] })] }), _jsxs(Card, { className: "contact-form-card", children: [_jsx("h2", { className: "card-title", children: "Send us a Message" }), _jsxs("form", { onSubmit: handleSubmit, className: "contact-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Your Name *" }), _jsx("input", { type: "text", required: true, value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "text-input", placeholder: "Enter your name" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Email Address *" }), _jsx("input", { type: "email", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "text-input", placeholder: "your.email@example.com" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Phone Number" }), _jsx("input", { type: "tel", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), className: "text-input", placeholder: "+880-XXX-XXXXXXX" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Subject *" }), _jsx("input", { type: "text", required: true, value: formData.subject, onChange: (e) => setFormData({ ...formData, subject: e.target.value }), className: "text-input", placeholder: "What is this regarding?" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Message *" }), _jsx("textarea", { required: true, rows: 6, value: formData.message, onChange: (e) => setFormData({ ...formData, message: e.target.value }), className: "textarea-input", placeholder: "Please describe your issue or question..." })] }), _jsx("button", { type: "submit", disabled: submitting, className: `primary-button ${submitting ? "disabled" : ""}`, children: submitting ? "Sending..." : "Send Message" })] })] })] })] }));
}
//# sourceMappingURL=ContactSupportPage.js.map