// =======================================
//  Packages
// =======================================
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// =======================================
// Initialize App
// =======================================
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// =======================================
// MySQL Connection
// =======================================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "klH.75384",
  database: "tenday4",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database (tenday4)");
  }
});

// =======================================
//  POST - Register Teacher & User
// =======================================
app.post("/api/teacher", (req, res) => {
  const { name, email, password, gender, subject, experience, qualification } = req.body;

  if (!name || !email || !password || !gender || !subject || !experience || !qualification) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const teacherSql = `
    INSERT INTO teacher (name, email, password, gender, subject, experience, qualification)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    teacherSql,
    [name, email, password, gender, subject, experience, qualification],
    (teacherErr, teacherResult) => {
      if (teacherErr) {
        if (teacherErr.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists in teacher table" });
        }
        console.error("❌ Error inserting into teacher table:", teacherErr);
        return res.status(500).json({ error: "Database error inserting teacher" });
      }

      console.log("✅ Teacher inserted:", teacherResult.insertId);

      // ✅ Insert user for login
      const userSql = `INSERT INTO users (email, password) VALUES (?, ?)`;
      db.query(userSql, [email, password], (userErr) => {
        if (userErr) {
          if (userErr.code === "ER_DUP_ENTRY") {
            console.warn("⚠ User already exists in users table.");
            return res.json({ message: "Teacher added, user already exists" });
          }
          console.error("❌ Error inserting user:", userErr);
          return res.status(500).json({ error: "Database error inserting user" });
        }

        console.log("✅ User inserted successfully");
        res.json({ message: "Teacher and user registered successfully" });
      });
    }
  );
});

// =======================================
//  POST - Login
// =======================================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Login query error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user: results[0] });
  });
});

// =======================================
//  GET - All Teachers (Home Page)
// =======================================
app.get("/api/teachers", (req, res) => {
  const sql = "SELECT * FROM teacher";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching teachers:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// =======================================
//  PUT - Edit Teacher by ID
// =======================================
app.put("/api/teachers/:id", (req, res) => {
  const teacherId = req.params.id;
  const { name, subject } = req.body;

  if (!name || !subject) {
    return res.status(400).json({ error: "Name and subject are required for update" });
  }

  const sql = "UPDATE teacher SET name = ?, subject = ? WHERE id = ?";
  db.query(sql, [name, subject, teacherId], (err, result) => {
    if (err) {
      console.error("❌ Error updating teacher:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    console.log(`✅ Teacher ${teacherId} updated`);
    res.json({ id: teacherId, name, subject, success: true });
  });
});

// =======================================
//  DELETE - Delete Teacher by ID
// =======================================
app.delete("/api/teachers/:id", (req, res) => {
  const teacherId = req.params.id;

  const sql = "DELETE FROM teacher WHERE id = ?";
  db.query(sql, [teacherId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting teacher:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    console.log(`🗑 Teacher ${teacherId} deleted`);
    res.json({ success: true, message: "Teacher deleted successfully" });
  });
});

// =======================================
// Start Server
// =======================================
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
