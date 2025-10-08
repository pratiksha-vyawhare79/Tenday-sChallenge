import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  // ✅ Handle Login
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

        fetchTeacherData(email);

        setTimeout(() => navigate("/Home"), 1200);
      } else {
        setMessage(`❌ ${data.error || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setMessage("❌ Server error. Check backend.");
    }
  };

  // ✅ Fetch teacher details by email
  const fetchTeacherData = async (emailValue) => {
    try {
      const response = await fetch(`http://localhost:5000/api/teacher/${emailValue}`);
      const data = await response.json();
      if (response.ok) setUserData(data);
      else setUserData(null);
    } catch (error) {
      console.error("❌ Error fetching teacher data:", error);
      setUserData(null);
    }
  };

  useEffect(() => {
    localStorage.removeItem("userEmail");
    setUserData(null);
  }, []);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Teacher Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        {message && <p className="login-message">{message}</p>}

        <div className="redirect-text">
          Don't have an account?
          <Link to="/SignIn" className="link-text"> Sign Up</Link>
        </div>
      </form>

      {userData && (
        <div className="user-details">
          <h3>👤 Logged in User Details:</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Subject:</strong> {userData.subject}</p>
        </div>
      )}
    </div>
  );
}
