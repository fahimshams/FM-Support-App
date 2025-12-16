import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/CategoryPage.tsx
import { useNavigate } from "react-router-dom";
import { machineCategories } from "../data/categories";
import { modelsByCategory } from "../data/models";
import { resolveImageUrl } from "../utils/imageUtils";
import Card from "../components/Card";
export default function CategoryPage() {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "page-container", children: [_jsx("div", { className: "header-row", children: _jsxs("div", { children: [_jsx("h2", { className: "page-title", children: "Select Machine Category" }), _jsx("p", { className: "page-subtitle", children: "Choose a category to view available machine models" })] }) }), _jsx("div", { className: "category-grid", children: machineCategories.map((category) => {
                    const models = modelsByCategory[category.id] || [];
                    const sampleModel = models[0];
                    // build correct image URL
                    const imageUrl = resolveImageUrl(sampleModel?.image);
                    return (_jsxs(Card, { onClick: () => navigate(`/machines/${category.id}`), className: "category-card", children: [imageUrl && (_jsx("img", { src: imageUrl, alt: category.name, className: "category-image" })), _jsxs("div", { children: [_jsx("div", { className: "category-title", children: category.name }), _jsx("div", { className: "category-description", children: category.description }), _jsxs("div", { className: "category-model-count", children: [models.length, " ", models.length === 1 ? "model" : "models", " available"] })] })] }, category.id));
                }) })] }));
}
//# sourceMappingURL=CategoryPage.js.map