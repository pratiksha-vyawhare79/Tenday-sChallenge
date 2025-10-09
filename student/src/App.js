import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";  // 👈 Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />   {/* First page */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
