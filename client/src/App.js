import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AddTask from "./components/AddTask";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function TokenHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Store token in localStorage
      localStorage.setItem("token", token);
      console.log("Token stored successfully");

      // Navigate without the token parameter (no setTimeout needed)
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return null; // This component doesn't render anything
}

function App() {
 
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.warn("No token available for request");
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Clean up interceptor on component unmount
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);
  return (
    <>
      <Router>
        <TokenHandler />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="d-flex">
                  <Sidebar />
                  <div
                    className="main-page"
                    style={{
                      width: "100%",
                      borderLeft: "1px solid #42434a",
                      padding: "min(3em, 15%)",
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/pending" element={<MainPage />} />
                      <Route path="/completed" element={<MainPage />} />
                      <Route path="/due-today" element={<MainPage />} />
                      <Route path="/add-task" element={<AddTask />} />{" "}
                      <Route path="/updateTask/:id" element={<AddTask />} />{" "}
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
