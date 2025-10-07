import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  //  Store form values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //  Store error messages
  const [errors, setErrors] = useState({});

  //  Update form values when user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  Basic, easy-to-understand validation
  const validate = () => {
    const newErrors = {};

    //  Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    //  Password Validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    //  Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  //  Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Here you can send data to backend
      console.log("Login Data:", formData);

      alert("Login Successful ");

      // Clear the form after success
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/*  Email Field */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/*  Password Field */}
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {/*  Submit Button */}
        <button type="submit">Login</button>

        {/*  Redirect Link */}
        <p className="redirect-text">
          Don't have an account?{" "}
          <Link to="/" className="link-text">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
