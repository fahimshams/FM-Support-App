import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { modelsByCategory } from "../data/models";
import { resolveImageUrl } from "../utils/imageUtils";
import Card from "../components/Card";
export default function ModelSelectPage() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const models = categoryId ? modelsByCategory[categoryId] : null;
    if (!models) {
        return (_jsx("div", { className: "page-container", children: _jsxs(Card, { className: "text-center", children: [_jsx("h2", { className: "card-title", children: "Invalid Category" }), _jsx("p", { className: "page-subtitle", children: "Please select a valid machine category." })] }) }));
    }
    return (_jsxs("div", { className: "page-container", children: [_jsx("div", { className: "header-row", children: _jsxs("div", { children: [_jsx("h2", { className: "page-title", children: "Select Machine Model" }), _jsx("p", { className: "page-subtitle", children: "Choose a model from this category" })] }) }), _jsx("div", { className: "model-grid", children: models.map((m) => {
                    const imageUrl = resolveImageUrl(m.image);
                    return (_jsxs(Card, { onClick: () => navigate(`/machines/${categoryId}/${m.id}`), className: "model-card", style: { alignItems: "center" }, children: [imageUrl && (_jsx("img", { src: imageUrl, alt: m.name, className: "model-image", style: { marginBottom: "16px" } })), _jsx("h3", { className: "model-name", style: { textAlign: "center" }, children: m.name })] }, m.id));
                }) })] }));
}
//# sourceMappingURL=ModelSelectPage.js.map