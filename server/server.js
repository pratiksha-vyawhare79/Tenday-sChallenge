
//Pakages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");


// Initialize App

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


//  MySQL Connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "klH.75384", 
  database: "tenday4",
});

db.connect((err) => {
  if (err) {
    console.error(" Database connection failed:", err);
  } else {
    console.log(" Connected to MySQL database (tenday4)");
  }
});


//  API 


// POST - Register Teacher & User
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
        console.error(" Error inserting into teacher table:", teacherErr);
        return res.status(500).json({ error: "Database error inserting teacher" });
      }

      console.log(" Teacher inserted:", teacherResult.insertId);

      const userSql = `INSERT INTO users (email, password) VALUES (?, ?)`;
      db.query(userSql, [email, password], (userErr) => {
        if (userErr) {
          if (userErr.code === "ER_DUP_ENTRY") {
            console.warn(" User already exists in users table.");
            return res.json({ message: "Teacher added, user already exists" });
          }
          console.error(" Error inserting user:", userErr);
          return res.status(500).json({ error: "Database error inserting user" });
        }

        console.log(" User inserted successfully");
        res.json({ message: "Teacher and user registered successfully" });
      });
    }
  );
});

// POST - Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(" Login query error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user: results[0] });
  });
});

//  GET - Teacher by Email
app.get("/api/teacher/:email", (req, res) => {
  const email = req.params.email;
  const sql = "SELECT * FROM teacher WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(" Error fetching teacher:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(results[0]);
  });
});

// GET - All Teachers ( Fixed for Home Page)
app.get("/api/teachers", (req, res) => {
  //  Fixed: Use SELECT * to match actual table structure (no hardcoded 'id')
  const sql = "SELECT * FROM teacher";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(" Error fetching teachers:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("Sending teachers:", results.length, "records");
    res.json(results);
  });
});


app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
}); 