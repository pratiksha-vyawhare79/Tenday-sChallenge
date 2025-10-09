import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import homeBg from "../assets/Home3.jpg";
import logo from "../assets/Logo.png";

export default function Home() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [editTeacher, setEditTeacher] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      navigate("/Login");
    } else {
      setUserEmail(email);
    }
  }, [navigate]);

  // ✅ Load teachers
  const fetchTeachers = () => {
    fetch("http://localhost:5000/api/teachers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch teachers");
        return res.json();
      })
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Error fetching teachers:", err));
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  //  Logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/Login");
  };

  //  Open edit modal
  const handleEdit = (teacher) => {
    setEditTeacher({ ...teacher });
  };

  //  Save edit changes
  const handleSaveEdit = () => {
    if (!editTeacher.name || !editTeacher.subject) {
      alert("Please fill all fields");
      return;
    }

    fetch(`http://localhost:5000/api/teachers/${editTeacher.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editTeacher.name,
        subject: editTeacher.subject,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update teacher");
        return res.json();
      })
      .then(() => {
        fetchTeachers();
        setEditTeacher(null);
      })
      .catch((err) => console.error("Error updating teacher:", err));
  };

  //  Delete teacher
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete teacher");
          setTeachers((prev) => prev.filter((t) => t.id !== id));
        })
        .catch((err) => console.error("Error deleting teacher:", err));
    }
  };

  // Show details modal
  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher);
  };

  //  Close modals
  const closeModal = () => {
    setSelectedTeacher(null);
    setEditTeacher(null);
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      {/*  Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <div className="navbar-text">
            <h2 className="navbar-title">MENTOR HUB</h2>
            <p className="navbar-subtitle">Teacher Management System</p>
          </div>
        </div>

        <div className="navbar-right">
          <span className="user-email">{userEmail}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/*  Teacher Table */}
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

      {/*  Details Modal */}
      {selectedTeacher && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Teacher Details</h2>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p><strong>ID:</strong> {selectedTeacher.id}</p>
              <p><strong>Name:</strong> {selectedTeacher.name}</p>
              <p><strong>Email:</strong> {selectedTeacher.email}</p>
              <p><strong>Gender:</strong> {selectedTeacher.gender}</p>
              <p><strong>Subject:</strong> {selectedTeacher.subject}</p>
              <p><strong>Experience:</strong> {selectedTeacher.experience}</p>
              <p><strong>Qualification:</strong> {selectedTeacher.qualification}</p>
            </div>
          </div>
        </div>
      )}

      {/*  Edit Modal */}
      {editTeacher && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Teacher</h2>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <label>Name:</label>
              <input
                type="text"
                value={editTeacher.name}
                onChange={(e) =>
                  setEditTeacher({ ...editTeacher, name: e.target.value })
                }
              />
              <label>Subject:</label>
              <input
                type="text"
                value={editTeacher.subject}
                onChange={(e) =>
                  setEditTeacher({ ...editTeacher, subject: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button className="save-btn" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
