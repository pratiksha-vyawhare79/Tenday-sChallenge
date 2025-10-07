import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

export default function SignIn() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    education: "",
    course: "",
  });

  const [errors, setErrors] = useState({});

  //  Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Basic validation function
  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.gender) newErrors.gender = "Select your gender";
    if (!formData.education) newErrors.education = "Select education";
    if (!formData.course) newErrors.course = "Select course";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Sign Up Successful ");
      console.log("Form Data:", formData);

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        education: "",
        course: "",
      });
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {/* Name */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        {/* Email */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* Password */}
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {/* Confirm Password */}
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        {/* Gender */}
        <label>Gender:</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}

        {/* Education */}
        <label>Education:</label>
        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
        >
          <option value="">-- Select Education --</option>
          <option value="graduation">Graduation</option>
          <option value="postGraduation">Post Graduation</option>
        </select>
        {errors.education && <p className="error">{errors.education}</p>}

        {/* Course */}
        <label>Course:</label>
        <select name="course" value={formData.course} onChange={handleChange}>
          <option value="">-- Select Course --</option>
          {formData.education === "graduation" && (
            <>
              <option value="BCA">BCA</option>
              <option value="BSc IT">BSc IT</option>
              <option value="B.Tech">B.Tech</option>
            </>
          )}
          {formData.education === "postGraduation" && (
            <>
              <option value="MCA">MCA</option>
              <option value="MSc IT">MSc IT</option>
              <option value="M.Tech">M.Tech</option>
            </>
          )}
        </select>
        {errors.course && <p className="error">{errors.course}</p>}

        <button type="submit">Sign Up</button>

        <p className="redirect-text">
          Already have an account?{" "}
          <Link to="/login" className="link-text">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
