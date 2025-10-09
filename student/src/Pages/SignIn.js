import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    subject: "",
    experience: "",
    qualification: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Fetch all registered teachers (GET)
  useEffect(() => {
    fetch("http://localhost:5000/api/teacher")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  // ✅ Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("🎉 Registration successful!");
        setTimeout(() => navigate("/Login"), 1200);
      } else {
        setMessage(`⚠️ ${data.error || "Something went wrong."}`);
      }
    } catch (err) {
      setMessage("🚨 Server error. Please check backend.");
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">📝 Teacher Registration</h2>

      <form onSubmit={handleSubmit} className="signin-form">
        <input type="text" name="name" placeholder="👤 Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="📧 Email Address" onChange={handleChange} required />
        <input type="password" name="password" placeholder="🔑 Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="✅ Confirm Password" onChange={handleChange} required />

        <select name="gender" onChange={handleChange} required>
          <option value="">⚧️ Select Gender</option>
          <option value="female">👩 Female</option>
          <option value="male">👨 Male</option>
          <option value="other">🌈 Other</option>
        </select>

        <input type="text" name="subject" placeholder="📚 Subject" onChange={handleChange} required />
        <input type="number" name="experience" placeholder="🧠 Experience (Years)" onChange={handleChange} required />
        <input type="text" name="qualification" placeholder="🎓 Qualification" onChange={handleChange} required />

        <button type="submit" className="signin-btn">🚀 Sign Up</button>
      </form>

      {message && <p className="signin-message">{message}</p>}

      <div className="redirect-text">
        Already have an account?{" "}
        <Link to="/Login" className="link-text">🔐 Login</Link>
      </div>

      <h3>👩‍🏫 Registered Teachers:</h3>
      <ul>
        {teachers.map((t) => (
          <li key={t.id}>
            {t.name} — {t.subject}
          </li>
        ))}
      </ul>
    </div>
  );
}
