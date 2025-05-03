import React from "react";
import "../assets/css/ContentArea.css";
import TaskCard from "./TaskCard";
import { useLocation, useParams } from "react-router-dom";
import AddTask from "./AddTask";
import axios from "axios";
import { useEffect, useState } from "react";
function ContentArea() {
  const location = useLocation();
  const path = location.pathname;
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch tasks when component loads
    axios
      .get("http://localhost:8000/tasks")
      .then((response) => {
        const sortedTasks = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const getHeading = () => {
    switch (path) {
      case "/add-task":
        return "Add New Task";
      case "/pending":
        return "Pending Tasks";
      case "/due-today":
        return "Due Today";
      case "/completed":
        return "Completed Tasks";
      default:
        return "All Tasks";
    }
  };
  const getEmptyStateMessage = () => {
    switch (path) {
      case "/pending":
        return "No pending tasks available";
      case "/due-today":
        return "No tasks due today";
      case "/completed":
        return "No completed tasks available";
      default:
        return "There are no tasks";
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    if (tasks.length > 0) {
      if (path === "/pending") {
        setFilteredTasks(tasks.filter((task) => task.status === "pending"));
      } else if (path === "/completed") {
        setFilteredTasks(tasks.filter((task) => task.status === "completed"));
      } else if (path === "/due-today") {
        setFilteredTasks(
          tasks.filter(
            (task) =>
              task.dueDate &&
              task.dueDate.split("T")[0] === today &&
              task.status === "pending"
          )
        );
        // console.log(tasks)
      } else if (path === "/add-task") {
      } else {
        setFilteredTasks(tasks);
      }
    }
    else{
      setFilteredTasks([]);
    }
  }, [path, tasks]);

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setFilteredTasks(filteredTasks.filter((task) => task.id !== taskId));
  };
  const handleStatusChange = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "completed" } : task
      )
    );
  };

  // console.log(tasks.length);
  // console.log(tasks)
  return (
    <div className="content-area">
      <div className="content-area-content">
        <h1>{getHeading()}</h1>
        {path === "/add-task" || path === `/updateTask/${id}` ? (
          <AddTask taskId={id} /> // Pass the task ID if present (edit mode)
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              onStatusChange={handleStatusChange}
              key={task.id}
              onDelete={handleDelete}
              task={task}
            />
          ))
        ) : (
          <div>{getEmptyStateMessage()}</div>
        )}
      </div>
    </div>
  );
}

export default ContentArea;
