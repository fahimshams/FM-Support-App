import { useNavigate } from "react-router-dom";
import zojeLogo from "../assets/zoje_logo.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-logo-wrapper">
          <img
            src={zojeLogo}
            alt="Zoje Machineries"
            className="login-logo"
          />
        </div>
        <h1 className="login-title">Zoje Machineries Support</h1>
        <p className="login-subtitle">After-Sales Support Portal - Bangladesh</p>

        <input
          type="text"
          placeholder="Enter your name"
          className="login-input"
        />

        <button
          onClick={handleLogin}
          className="login-button primary-button"
        >
          Login
        </button>
      </div>
    </div>
  );
}
