// src/pages/CategoryPage.tsx
import { useNavigate } from "react-router-dom";
import { modelsByCategory } from "../data/models";
import { BASE_URL } from "../api"; 

export default function CategoryPage() {
  const navigate = useNavigate();

  const categories = Object.keys(modelsByCategory); // lockstitch / overlock / welting

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "1.4rem", marginBottom: "16px" }}>
        Choose Machine Category
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {categories.map((categoryId) => {
          const models = modelsByCategory[categoryId];
          const sampleModel = models[0];

          // build correct image URL for mobile
          const imageUrl = sampleModel?.image
            ? `${BASE_URL}${sampleModel.image}` // ⬅️ IMPORTANT
            : "";

          const label =
            categoryId === "lockstitch"
              ? "Lockstitch"
              : categoryId === "overlock"
              ? "Overlock"
              : categoryId === "welting"
              ? "Pocket Welting"
              : categoryId;

          return (
            <button
              key={categoryId}
              onClick={() => navigate(`/machines/${categoryId}`)}
              style={{
                textAlign: "left",
                borderRadius: "16px",
                border: "1px solid #1f2937",
                background: "#020617",
                padding: "14px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={sampleModel?.name ?? label}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    background: "#020617",
                  }}
                />
              )}

              <div
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  marginTop: "4px",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  opacity: 0.75,
                }}
              >
                {models.length} demo models registered
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
