import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import TeacherImage from "../assets/Teacher.jpg";
import Logo from "../assets/Logo.png";  

export default function Welcome() {
  return (
    <div
      className="welcome-container"
      style={{ backgroundImage: `url(${TeacherImage})` }}
    >
      {/* Logo + App Name */}
      <div className="welcome-header">
        <img src={Logo} alt="Mentors Hub Logo" className="welcome-logo" />
        <div>
          <h1 className="app-name">MENTOR HUB</h1>
          <p className="app-subtitle">Teacher Management System</p>
        </div>
      </div>

      {/* Center Box */}
      <div className="welcome-box">
        <h2 className="welcome-title">
          Welcome to <span>Mantor Hub</span>
        </h2>
        <p className="welcome-subtitle">
          Manage teachers efficiently with a smooth and friendly interface.
        </p>
        <Link to="/Login" className="welcome-button">
          Get Started
        </Link>
      </div>
    </div>
  );
}
