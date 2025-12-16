// src/pages/CategoryPage.tsx
import { useNavigate } from "react-router-dom";
import { machineCategories } from "../data/categories";
import { modelsByCategory } from "../data/models";
import { resolveImageUrl } from "../utils/imageUtils";
import Card from "../components/Card"; 

export default function CategoryPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="header-row">
        <div>
          <h2 className="page-title">Select Machine Category</h2>
          <p className="page-subtitle">
            Choose a category to view available machine models
          </p>
        </div>
      </div>

      <div className="category-grid">
        {machineCategories.map((category) => {
          const models = modelsByCategory[category.id] || [];
          const sampleModel = models[0];

          // build correct image URL
          const imageUrl = resolveImageUrl(sampleModel?.image);

          return (
            <Card
              key={category.id}
              onClick={() => navigate(`/machines/${category.id}`)}
              className="category-card"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={category.name}
                  className="category-image"
                />
              )}

              <div>
                <div className="category-title">{category.name}</div>
                <div className="category-description">{category.description}</div>
                <div className="category-model-count">
                  {models.length} {models.length === 1 ? "model" : "models"} available
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
