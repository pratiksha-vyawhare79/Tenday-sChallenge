import React, { useState } from "react";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState({});

  const graduationCourses = ["B.Sc", "B.Com", "B.Tech", "BA", "BBA", "BCA"];
  const postGraduationCourses = ["M.Sc", "M.Com", "M.Tech", "MA", "MBA", "MCA"];

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name should contain only alphabets and spaces";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include upper, lower, number, and special character";
    }

    if (!gender) newErrors.gender = "Please select gender";
    if (!education) newErrors.education = "Please select your education";
    if (!course) newErrors.course = "Please select a course";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    alert(`
 Sign In Successful!

Name: ${name}
Email: ${email}
Gender: ${gender}
Education: ${education}
Course: ${course}
    `);

    setName("");
    setEmail("");
    setPassword("");
    setGender("");
    setEducation("");
    setCourse("");
    setErrors({});
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          button:hover {
            background: linear-gradient(135deg, #ff6a00, #d483aaff);
            transform: scale(1.05);
            transition: all 0.3s ease;
          }
          input:focus, select:focus {
            border-color: #2575fc;
            box-shadow: 0 0 5px #2575fc;
          }
        `}
      </style>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>🎓 Student Sign In</h2>

        {/* Name */}
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        {errors.name && <p style={styles.error}>{errors.name}</p>}

        {/* Email */}
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        {/* Password */}
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        {/* Gender */}
        <label>Gender:</label><br />
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          /> Male
        </label>{" "}
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          /> Female
        </label>{" "}
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={gender === "Other"}
            onChange={(e) => setGender(e.target.value)}
          /> Other
        </label>
        {errors.gender && <p style={styles.error}>{errors.gender}</p>}

        {/* Education */}
        <div style={{ marginTop: "10px" }}>
          <label>Education:</label><br />
          <label>
            <input
              type="checkbox"
              value="Graduation"
              checked={education === "Graduation"}
              onChange={() => {
                if (education === "Graduation") {
                  setEducation("");
                  setCourse("");
                } else {
                  setEducation("Graduation");
                  setCourse("");
                }
              }}
            /> Graduation
          </label>{" "}
          <label>
            <input
              type="checkbox"
              value="Post Graduation"
              checked={education === "Post Graduation"}
              onChange={() => {
                if (education === "Post Graduation") {
                  setEducation("");
                  setCourse("");
                } else {
                  setEducation("Post Graduation");
                  setCourse("");
                }
              }}
            /> Post Graduation
          </label>
        </div>
        {errors.education && <p style={styles.error}>{errors.education}</p>}

        {/* Course Dropdown */}
        {education && (
          <div style={{ marginTop: "10px" }}>
            <label>Select Course:</label><br />
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              style={styles.input}
            >
              <option value="">-- Select Course --</option>
              {(education === "Graduation" ? graduationCourses : postGraduationCourses).map(
                (c, index) => (
                  <option key={index} value={c}>{c}</option>
                )
              )}
            </select>
            {errors.course && <p style={styles.error}>{errors.course}</p>}
          </div>
        )}

        {/* Submit */}
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

//  Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(-45deg, #6a11cb, #2575fc, #ff6a00, #ee0979)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 10s ease infinite",
    padding: "20px",
  },
  form: {
    width: "340px",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
    animation: "fadeIn 0.6s ease",
  },
  title: {
    textAlign: "center",
    color: "#2575fc",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "5px 0 10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "0.3s",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "-5px",
    marginBottom: "8px",
  },
  button: {
    width: "100%",
    background: "linear-gradient(135deg, #2575fc, #f1edf5ff)",
    color: "#0c0202ff",
    
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "0.3s",
  },
};
