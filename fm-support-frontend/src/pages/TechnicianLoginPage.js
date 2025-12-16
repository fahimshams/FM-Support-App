import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function TechnicianLoginPage() {
    const [techName, setTechName] = useState("");
    const navigate = useNavigate();
    const handleLogin = () => {
        if (!techName.trim())
            return;
        navigate("/tech/dashboard", { state: { techName } });
    };
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "linear-gradient(135deg, #F5F7FA 0%, #E8ECF1 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
            padding: "20px",
        }, children: _jsxs("div", { style: {
                background: "#FFFFFF",
                padding: "40px",
                borderRadius: "16px",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid #E2E8F0",
            }, children: [_jsx("div", { style: {
                        width: 64,
                        height: 64,
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #0052A3 0%, #0066CC 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "white",
                        margin: "0 auto 24px",
                        boxShadow: "0 4px 6px -1px rgba(0, 82, 163, 0.3)",
                    }, children: "ZJ" }), _jsx("h2", { style: {
                        textAlign: "center",
                        marginBottom: "8px",
                        fontSize: "1.75rem",
                        color: "#1A1F36",
                        fontWeight: 600,
                    }, children: "Technician Login" }), _jsx("p", { style: {
                        textAlign: "center",
                        fontSize: "0.9rem",
                        color: "#718096",
                        marginBottom: "32px",
                    }, children: "Access the service team dashboard" }), _jsx("input", { value: techName, onChange: (e) => setTechName(e.target.value), placeholder: "Enter your name", style: {
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        background: "#FFFFFF",
                        color: "#1A1F36",
                        marginBottom: "16px",
                        fontSize: "0.9rem",
                        transition: "all 0.2s ease",
                    }, onFocus: (e) => {
                        e.currentTarget.style.borderColor = "#0066CC";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 102, 204, 0.1)";
                    }, onBlur: (e) => {
                        e.currentTarget.style.borderColor = "#E2E8F0";
                        e.currentTarget.style.boxShadow = "none";
                    } }), _jsx("button", { onClick: handleLogin, disabled: !techName.trim(), style: {
                        width: "100%",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        border: "none",
                        background: !techName.trim() ? "#CBD5E0" : "#0052A3",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        cursor: !techName.trim() ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: !techName.trim() ? "none" : "0 2px 4px rgba(0, 82, 163, 0.2)",
                    }, onMouseEnter: (e) => {
                        if (techName.trim()) {
                            e.currentTarget.style.background = "#0066CC";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 102, 204, 0.3)";
                        }
                    }, onMouseLeave: (e) => {
                        if (techName.trim()) {
                            e.currentTarget.style.background = "#0052A3";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 82, 163, 0.2)";
                        }
                    }, children: "Go to Dashboard" })] }) }));
}
//# sourceMappingURL=TechnicianLoginPage.js.map