import { useParams, useNavigate } from "react-router-dom";
import { modelsByCategory } from "../data/models";
import { resolveImageUrl } from "../utils/imageUtils";
import Card from "../components/Card";

export default function ModelSelectPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const models = categoryId ? modelsByCategory[categoryId] : null;

  if (!models) {
    return (
      <div className="page-container">
        <Card className="text-center">
          <h2 className="card-title">Invalid Category</h2>
          <p className="page-subtitle">
            Please select a valid machine category.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="header-row">
        <div>
          <h2 className="page-title">Select Machine Model</h2>
          <p className="page-subtitle">
            Choose a model from this category
          </p>
        </div>
      </div>

      <div className="model-grid">
        {models.map((m) => {
          const imageUrl = resolveImageUrl(m.image);

          return (
            <Card
              key={m.id}
              onClick={() => navigate(`/machines/${categoryId}/${m.id}`)}
              className="model-card"
              style={{ alignItems: "center" }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={m.name}
                  className="model-image"
                  style={{ marginBottom: "16px" }}
                />
              )}
              <h3 className="model-name" style={{ textAlign: "center" }}>
                {m.name}
              </h3>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
