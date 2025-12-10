import { useParams, useNavigate } from "react-router-dom";
import { modelsByCategory } from "../data/models";
import { BASE_URL } from "../api"; 

export default function ModelSelectPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const models = categoryId ? modelsByCategory[categoryId] : null;

  if (!models) {
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
        Invalid category.
      </div>
    );
  }

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
        Select Machine Model
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {models.map((m) => {
          const imageUrl = m.image
            ? `${BASE_URL}${m.image}` 
            : "";

          return (
            <div
              key={m.id}
              onClick={() => navigate(`/machines/${categoryId}/${m.id}`)}
              style={{
                borderRadius: "12px",
                border: "1px solid #1f2937",
                background: "#020617",
                padding: "16px",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
              }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={m.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "contain",
                    marginBottom: "12px",
                  }}
                />
              )}
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{m.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
