import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import zojeLogo from "../assets/zoje_logo.png";
export default function LoginPage() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/dashboard");
    };
    return (_jsx("div", { className: "login-page-container", children: _jsxs("div", { className: "login-card", children: [_jsx("div", { className: "login-logo-wrapper", children: _jsx("img", { src: zojeLogo, alt: "Zoje Machineries", className: "login-logo" }) }), _jsx("h1", { className: "login-title", children: "Zoje Machineries Support" }), _jsx("p", { className: "login-subtitle", children: "After-Sales Support Portal - Bangladesh" }), _jsx("input", { type: "text", placeholder: "Enter your name", className: "login-input" }), _jsx("button", { onClick: handleLogin, className: "login-button primary-button", children: "Login" })] }) }));
}
//# sourceMappingURL=LoginPage.js.map