import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function ProtectedRoute({ children }) {
  console.log("protected");
  const token = localStorage.getItem("token");
  console.log("token", token);
  if (!token) {
    console.warn("No token found");
    return <Navigate to="/login" />;
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    if (decoded.exp < currentTime) {
      console.warn("Token expired");
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch (err) {
    console.error("Invalid token");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
