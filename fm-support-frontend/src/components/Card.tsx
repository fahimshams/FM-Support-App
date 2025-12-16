import React from "react";

export default function Card({
  children,
  onClick,
  style = {},
  className = "",
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      onClick={onClick ? (e) => onClick(e) : undefined}
      className={`card-base ${className}`}
      style={{
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
