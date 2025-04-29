import React from "react";
import "../assets/css/TaskCard.css";
import "../assets/css/MainPage.css";
import SquareButton from "./SquareButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function TaskCard({ task, onDelete, onStatusChange }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/deleteTask/${task.id}`);
      onDelete(task.id); // Notify the parent component to update the state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = () => {
    // Navigate to AddTask with the task ID to edit
    navigate(`/updateTask/${task.id}`);
  };
  const handleMarkAsCompleted = async () => {
    try {
      await axios.put(`http://localhost:8000/updateTask/${task.id}`, {
        ...task,
        status: "completed", // Only change status
      });
      if (onStatusChange) {
        onStatusChange(task.id); // Notify parent that status changed
      }
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  return (
    <div className="task-card my-2">
      <div className="task-head">
        <h2 className="title">{task.title}</h2>
        <p className="due-date">{task.dueDate?.split("T")[0]}</p>
      </div>
      <p className="description">{task.description}</p>
      <div className="content-end-row">
        {task.status === "pending" ? (
          
        <SquareButton text="Edit" onClick={handleEdit} property={"info"} />
        ) : (
          ""
        )}
        <SquareButton
          text="Delete"
          onClick={handleDelete}
          property={"danger"}
        />
        {task.status === "pending" ? (
          <SquareButton onClick={handleMarkAsCompleted} text="Mark as Completed" property={"success"} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TaskCard;
