import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import Login from "./Pages/Login";
import Home from "./Pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/Login" element={<Login />} />
         <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
