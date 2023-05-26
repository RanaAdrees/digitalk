import React from "react";
import { Router,Routes, Route, Navigate,useNavigate } from "react-router-dom";
import Home from "../pages/HomePage";
import Login from "../pages/Login";
import Signup from "../pages/signup";
import OtpVerification from "../pages/otpVerification";


const Routers = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/login"
        element={<Login/>}
      />
      <Route path="/register" element={<Signup />} />
      <Route path="/otpVerification" element={<OtpVerification />} />
    </Routes>
  );
}

export default Routers;
