import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Import all pages
import SignIn from "./Pages/SignIn";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";
import Admin from "./Pages/Admin";


function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 First (Welcome) page */}
        <Route path="/" element={<Welcome />} />

        {/* 🔐 Authentication Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Login" element={<Login />} />
       

        {/* 🧑‍🏫 Dashboard / Admin Pages */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
