import React, { useState } from "react";
import "./SignIn.css";

export default function SignIn() {
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

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(" Registration successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          gender: "",
          subject: "",
          experience: "",
          qualification: "",
        });
        setErrors({});
      } else {
        setSuccessMessage("");
        alert(result.error || " Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert(" Failed to connect to API");
    }
  };

  return (
    <div className="signin-container">
      <h2>Teacher Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <div className="gender-group">
          <label>
            <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} />
            Female
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <input name="subject" type="text" placeholder="Subject" value={formData.subject} onChange={handleChange} />
        {errors.subject && <p className="error">{errors.subject}</p>}

        <input name="experience" type="number" placeholder="Experience (years)" value={formData.experience} onChange={handleChange} />
        {errors.experience && <p className="error">{errors.experience}</p>}

        <input name="qualification" type="text" placeholder="Qualification" value={formData.qualification} onChange={handleChange} />
        {errors.qualification && <p className="error">{errors.qualification}</p>}

        <button type="submit">Sign Up</button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}

      <p className="login-text">
        Already have an account? <a href="/Login">Log in</a>
      </p>
    </div>
  );
}
