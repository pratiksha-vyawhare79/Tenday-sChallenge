import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  //  Redirect if not logged in
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/Login");
    }
  }, [navigate]); // ✅ Included navigate to fix ESLint warning

  // ✅ Fetch teachers data
  useEffect(() => {
    fetch("http://localhost:5000/api/teachers")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/Login");
  };

  // ✏️ Edit handler
  const handleEdit = (teacher) => {
    console.log("Edit clicked for:", teacher);
    // You can open a modal or navigate to an edit page here
  };

  // 🗑️ Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setTeachers((prev) => prev.filter((t) => t.id !== id));
          } else {
            console.error("Failed to delete teacher");
          }
        })
        .catch((err) => console.error("Error deleting teacher:", err));
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>👩‍🏫 Teachers List</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {teachers.length > 0 ? (
        <table className="teacher-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Experience</th>
              <th>Qualification</th>
              <th>Actions</th> {/* ✅ New column */}
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.subject}</td>
                <td>{t.experience}</td>
                <td>{t.qualification}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No data available</p>
      )}
    </div>
  );
}
