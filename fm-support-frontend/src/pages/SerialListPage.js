import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { modelsByCategory } from "../data/models";
import { generateSerials } from "../data/generateSerials";
import { spareParts } from "../data/spareParts";
import { useState } from "react";
import { resolveImageUrl } from "../utils/imageUtils";
import Card from "../components/Card";
export default function SerialListPage() {
    const { categoryId, modelId } = useParams();
    const navigate = useNavigate();
    const model = categoryId
        ? modelsByCategory[categoryId]?.find((m) => m.id === modelId)
        : null;
    const [serials] = useState(() => (modelId ? generateSerials(modelId) : []));
    if (!model || !modelId) {
        return (_jsx("div", { style: { maxWidth: "600px", margin: "0 auto" }, children: _jsxs(Card, { style: { padding: "32px", textAlign: "center" }, children: [_jsx("h2", { style: { fontSize: "1.5rem", marginBottom: "8px", color: "#1A1F36", fontWeight: 600 }, children: "Invalid Machine Model" }), _jsx("p", { style: { fontSize: "0.95rem", color: "#718096" }, children: "Please select a valid machine model." })] }) }));
    }
    const parts = spareParts[modelId] ?? [];
    const imageUrl = resolveImageUrl(model.image);
    return (_jsxs("div", { children: [_jsxs("div", { style: { marginBottom: "24px" }, children: [_jsx("h2", { style: { fontSize: "1.75rem", marginBottom: "8px", color: "#1A1F36", fontWeight: 600 }, children: model.name }), _jsx("p", { style: { fontSize: "0.95rem", color: "#718096" }, children: "Factory Inventory" })] }), serials.map((s, idx) => (_jsx(Card, { style: { marginBottom: "16px", padding: "24px" }, children: _jsxs("div", { style: { display: "flex", gap: "20px", flexWrap: "wrap" }, children: [imageUrl && (_jsx("div", { style: {
                                width: "120px",
                                height: "120px",
                                borderRadius: "8px",
                                background: "#F5F7FA",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                border: "1px solid #E2E8F0",
                                flexShrink: 0,
                            }, children: _jsx("img", { src: imageUrl, alt: model.name, style: {
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                } }) })), _jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [_jsxs("div", { style: {
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        marginBottom: "12px",
                                        color: "#1A1F36",
                                    }, children: ["Serial: ", _jsx("span", { style: { color: "#0066CC" }, children: s.serial })] }), _jsxs("div", { style: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                        gap: "12px",
                                        marginBottom: "16px",
                                    }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }, children: "Purchase Date" }), _jsx("div", { style: { fontSize: "0.95rem", fontWeight: 500, color: "#1A1F36" }, children: s.purchaseDate })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }, children: "Warranty Expiry" }), _jsx("div", { style: { fontSize: "0.95rem", fontWeight: 500, color: "#1A1F36" }, children: s.expiryDate })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: "0.875rem", color: "#718096", marginBottom: "4px" }, children: "Warranty Status" }), _jsx("div", { style: {
                                                        fontSize: "0.95rem",
                                                        fontWeight: 600,
                                                        color: s.active ? "#059669" : "#DC2626",
                                                    }, children: s.active ? "Active" : "Expired" })] })] }), _jsxs("div", { style: { fontSize: "0.875rem", color: "#4A5568", marginBottom: "12px" }, children: [_jsx("strong", { children: "Coverage:" }), " ", s.coverage] }), _jsxs("details", { style: {
                                        fontSize: "0.9rem",
                                        marginBottom: "16px",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        background: "#F5F7FA",
                                        border: "1px solid #E2E8F0",
                                    }, children: [_jsx("summary", { style: {
                                                cursor: "pointer",
                                                fontWeight: 500,
                                                color: "#1A1F36",
                                                marginBottom: "8px",
                                            }, children: "Spare Parts (BDT)" }), _jsx("ul", { style: { marginTop: "8px", paddingLeft: "20px", color: "#4A5568" }, children: parts.map((p, i) => (_jsxs("li", { style: { marginBottom: "4px" }, children: [p.name, " \u2014 ", _jsxs("strong", { style: { color: "#0066CC" }, children: ["\u09F3", p.price * 110] }), " (approx)"] }, i))) })] }), _jsx("button", { onClick: () => navigate("/ticket", {
                                        state: {
                                            modelId,
                                            serial: s.serial,
                                            machineImage: imageUrl,
                                        },
                                    }), style: {
                                        padding: "10px 20px",
                                        borderRadius: "8px",
                                        border: "none",
                                        background: "#0066CC",
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: "0.9rem",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }, onMouseEnter: (e) => {
                                        e.currentTarget.style.background = "#0052A3";
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }, onMouseLeave: (e) => {
                                        e.currentTarget.style.background = "#0066CC";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }, children: "Report Issue" })] })] }) }, idx)))] }));
}
//# sourceMappingURL=SerialListPage.js.map