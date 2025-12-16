// src/pages/ContactSupportPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function ContactSupportPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-container">
        <Card className="success-card">
          <div className="success-icon">✓</div>
          <h2 className="card-title">Message Sent Successfully!</h2>
          <p className="page-subtitle">
            Our support team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
              });
            }}
            className="primary-button"
          >
            Send Another Message
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="secondary-button"
            style={{ marginLeft: "12px" }}
          >
            Back to Dashboard
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="header-row">
        <div>
          <h1 className="page-title">Contact Support</h1>
          <p className="page-subtitle">
            Get in touch with our support team for assistance
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="secondary-button"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="contact-grid">
        {/* Contact Information */}
        <Card className="contact-info-card">
          <h2 className="card-title">Support Information</h2>
          <p style={{ fontSize: "0.875rem", color: "var(--zoje-text-secondary)", marginBottom: "20px" }}>
            We typically respond within 2 hours during business hours. For urgent issues, call us directly.
          </p>
          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="contact-info-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <p>
                  <a href="tel:+8801712345678" className="phone-link" style={{ color: "var(--zoje-primary)", textDecoration: "none" }}>
                    +880-1712-345678
                  </a>
                </p>
                <a href="tel:+8801712345678" className="primary-button" style={{ marginTop: "8px", display: "inline-block", fontSize: "0.875rem", padding: "8px 16px" }}>
                  📞 Call Now
                </a>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">✉️</div>
              <div>
                <strong>Email</strong>
                <p>
                  <a href="mailto:support@zojebd.com" className="phone-link" style={{ color: "var(--zoje-primary)", textDecoration: "none" }}>
                    support@zojebd.com
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">📍</div>
              <div>
                <strong>Address</strong>
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">🕐</div>
              <div>
                <strong>Business Hours</strong>
                <p>Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                <p>Friday: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="contact-form-card">
          <h2 className="card-title">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="text-input"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="text-input"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="text-input"
                placeholder="+880-XXX-XXXXXXX"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="text-input"
                placeholder="What is this regarding?"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="textarea-input"
                placeholder="Please describe your issue or question..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`primary-button ${submitting ? "disabled" : ""}`}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

