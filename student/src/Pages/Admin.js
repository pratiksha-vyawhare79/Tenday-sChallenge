import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import logo from "../assets/Logo.png";

export default function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful!");
        localStorage.setItem("userEmail", email);
        setTimeout(() => navigate("/Home"), 1200);
      } else {
        setMessage(`❌ ${data.error || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("⚠️ Server error. Check backend.");
    }
  };

  useEffect(() => {
    localStorage.removeItem("userEmail");
  }, []);

  return (
    <div className="login-page">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <div>
            <h2 className="navbar-title">MENTOR HUB</h2>
            <p className="app-subtitle">Teacher Management System</p>
          </div>
        </div>
      </nav>

      {/* ✅ Admin Login Form */}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Admin Login</h2>

          <div className="input-group">
            <span className="input-emoji">📧</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group password-group">
            <span className="input-emoji">🔐</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              👁️
            </button>
          </div>

          {/* ✅ Admin Login Button */}
          <button type="submit" className="login-btn">
            Login
          </button>

          {/* ✅ Go to Teacher Login Button (goes to Login.js page) */}
          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/login")} // ✅ changed to /login
            style={{ backgroundColor: "#2d705a" }}
          >
            Go to Teacher Login
          </button>

          {message && <p className="login-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
