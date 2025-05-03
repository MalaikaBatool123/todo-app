import React from "react";
import "../assets/css/Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
function Sidebar() {
  const location = useLocation(); // Hook to get current location

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("close");
  };
  const isActive = (path) => {
    if (path === "/updateTask") {
      return location.pathname.startsWith("/updateTask/") ? "active" : "";
    }
    return location.pathname === path ? "active" : "";
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");

      const response = await axios.get("http://localhost:8000/logout", {
        withCredentials: true,
      });

      window.location.href = response.data.redirectUrl || "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="sidebar" id="sidebar">
      <ul>
        <li>
          <span className="logo"><span className="logo-1">Tas</span><span className="logo-2">Ky</span></span>
          <button onClick={toggleSidebar} id="toggle-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
            </svg>
          </button>
        </li>
        {!location.pathname.startsWith("/updateTask/") && (
          <li className={isActive("/add-task")}>
            <Link to="/add-task">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
              <span>Add Task</span>
            </Link>
          </li>
        )}

        {location.pathname.startsWith("/updateTask/") && (
          <li className={isActive("/updateTask")}>
            <Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v240H560v-80h110q-32-56-87.5-88T480-760q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
              </svg>

              <span>Update Task</span>
            </Link>
          </li>
        )}

        <li className={isActive("/")}>
          <Link to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" />
            </svg>
            <span>All Tasks</span>
          </Link>
        </li>

        <li className={isActive("/pending")}>
          <Link to={"/pending"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-320q17 0 28.5-11.5T520-560v-160q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720v160q0 17 11.5 28.5T480-520Z" />
            </svg>
            <span>Pending</span>
          </Link>
        </li>
        <li className={isActive("/due-today")}>
          <Link to={"/due-today"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm280 240q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm-40 120v-200h80v200h-80ZM200-200v-480 480Z" />
            </svg>
            <span>Due Today</span>
          </Link>
        </li>
        <li className={isActive("/completed")}>
          <Link to="/completed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm-80-180 280-280-56-56-224 224-104-104-56 56 160 160Z" />
            </svg>
            <span>Completed</span>
          </Link>
        </li>
        <li className={isActive("/profile")}>
          <Link to="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <button className="logout-btn btn btn-sm" onClick={handleLogout}>
            <Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
              </svg>
              <span>Log Out</span>
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
