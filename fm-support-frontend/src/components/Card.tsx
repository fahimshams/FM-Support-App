import React from "react";

export default function Card({
  children,
  onClick,
  style = {},
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "18px",
        padding: "18px",
        cursor: onClick ? "pointer" : "default",
        backdropFilter: "blur(10px)",
        transition: "all 0.2s ease",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.15), inset 0 0 0 0 rgba(255,255,255,0.15)",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 6px 18px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.2)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.15), inset 0 0 0 0 rgba(255,255,255,0.15)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {children}
    </div>
  );
}
