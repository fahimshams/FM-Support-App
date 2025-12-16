import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
export default function Card({ children, onClick, style = {}, className = "", }) {
    return (_jsx("div", { onClick: onClick, className: `card-base ${className}`, style: {
            cursor: onClick ? "pointer" : "default",
            ...style,
        }, children: children }));
}
//# sourceMappingURL=Card.js.map