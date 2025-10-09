import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import TeacherImage from "../assets/Teacher.jpg";  // ✅ Make sure file name matches exactly

export default function Welcome() {
  return (
    <div
      className="welcome-container"
      style={{ backgroundImage: `url(${TeacherImage})` }}
    >
      <div className="welcome-box">
        <h1 className="welcome-title">Welcome to the Teacher Management System</h1>
        <p className="welcome-subtitle">
          Manage teachers efficiently with a smooth and friendly interface.
        </p>
        <Link to="/signIn" className="welcome-button">
          Get Started
        </Link>
      </div>
    </div>
  );
}
