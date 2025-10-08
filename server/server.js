// =============================
//  Import Required Packages
// =============================
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// =============================
// App Config
// =============================
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// =============================
//  MySQL Database Connection
// =============================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "klH.75384",  // Your MySQL password here
  database: "tenday3"     //  Make sure this database exists
});

db.connect((err) => {
  if (err) {
    console.error(" MySQL connection failed:", err);
    process.exit(1);
  } else {
    console.log(" Connected to MySQL Database: tenday3");
  }
});

// =============================
// SIGNUP — Insert into teacher + users
// =============================
app.post("/api/teacher", (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    gender,
    subject,
    experience,
    qualification
  } = req.body;

  //  Basic validation
  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender ||
    !subject ||
    !experience ||
    !qualification
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  //  Insert into teacher table
  const teacherSql = `
    INSERT INTO teacher (name, email, password, gender, subject, experience, qualification)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const teacherValues = [name, email, password, gender, subject, experience, qualification];

  db.query(teacherSql, teacherValues, (err, teacherResult) => {
    if (err) {
      console.error(" Error inserting into teacher table:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already registered." });
      }
      return res.status(500).json({ error: "Database error (teacher)." });
    }

    console.log("Teacher data inserted:", teacherResult.insertId);

    // Insert into users table after teacher insert succeeds
    const userSql = "INSERT INTO users (email, password) VALUES (?, ?)";
    const userValues = [email, password];

    db.query(userSql, userValues, (err2, userResult) => {
      if (err2) {
        console.error("Error inserting into users table:", err2);
        return res.status(500).json({ error: "Database error (users)." });
      }

      console.log(" User data inserted:", userResult.insertId);
      res.status(200).json({ message: "Teacher registered successfully!" });
    });
  });
});

// =============================
// 🔐 LOGIN — Verify from users table
// =============================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required." });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Login query error:", err);
      return res.status(500).json({ error: "Database error." });
    }

    if (results.length > 0) {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ error: "Invalid email or password." });
    }
  });
});

// =============================
// 📋 GET All Teachers
// =============================
app.get("/api/teacher", (req, res) => {
  db.query("SELECT * FROM teacher", (err, results) => {
    if (err) {
      console.error("❌ Fetch teacher error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

// =============================
// 📋 GET All Users
// =============================
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("❌ Fetch users error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

// =============================
// 🚀 Start the Server
// =============================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
