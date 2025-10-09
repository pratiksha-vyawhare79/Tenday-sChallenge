import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import homeBg from "../assets/Home.jpg"; // Import background image

export default function Home() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/Login");
    }
  }, [navigate]);

  //  Fetch teachers from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/teachers")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/Login");
  };

  // Edit
  const handleEdit = (teacher) => {
    console.log("Edit clicked for:", teacher);
    // navigate(`/edit/${teacher.id}`);
  };

  //  Delete
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

  // Show Details Popup
  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher);
  };

  //  Close Popup
  const closePopup = () => {
    setSelectedTeacher(null);
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 98, 65, 0.9), rgba(0, 158, 96, 0.9)), url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/*  Header */}
      <div className="home-header">
        <h1>Teachers List</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Teachers Table */}
      {teachers.length > 0 ? (
        <table className="teacher-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(t)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="details-btn"
                      onClick={() => handleViewDetails(t)}
                    >
                      Details
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

      {/* Popup Box */}
      {selectedTeacher && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>Teacher Details</h2>
            <p>
              <strong>ID:</strong> {selectedTeacher.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedTeacher.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedTeacher.email}
            </p>
            <p>
              <strong>Subject:</strong> {selectedTeacher.subject}
            </p>
            <p>
              <strong>Experience:</strong> {selectedTeacher.experience}
            </p>
            <p>
              <strong>Qualification:</strong> {selectedTeacher.qualification}
            </p>
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
