// db.js
import mysql from "mysql2";

// ✅ Create a connection pool for better performance
const db = mysql.createPool({
  host: "localhost",      // Your MySQL host (usually localhost)
  user: "root",           // Your MySQL username
  password: "klH.75384",           // Your MySQL password
  database: "tenday3", // Your database name
  connectionLimit: 10     // Optional: max number of connections
});

// ✅ Test the connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Database connected successfully!");
  connection.release();
});

export default db;
