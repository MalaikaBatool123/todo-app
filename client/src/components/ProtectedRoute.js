import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication inside useEffect to prevent re-render loops
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }
      
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
        
        if (decoded.exp < currentTime) {
          console.warn("Token expired");
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        } else {
          console.log("Valid token found, user authenticated");
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []); // Empty dependency array so this only runs once when component mounts

  if (isLoading) {
    return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "95vh" }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;