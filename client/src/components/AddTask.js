import React, { useState } from "react";
import axios from "axios";
import "../assets/css/AddTask.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import UnAuthorized from "./UnAuthorized";
function AddTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
  });

  const [isAuthorized, setIsAuthorized] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (id) {
          const taskResponse = await axios.get(
            `http://localhost:8000/tasks/${id}`
          );
          const task = taskResponse.data;

          // 2. Get current user's profile
          const userResponse = await axios.get(
            "http://localhost:8000/get-profile"
          );
          const user = userResponse.data;

          // 3. Verify ownership
          if (task.user_id !== user.id) {
            setIsAuthorized(false);
            return;
          }
          setFormData({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            status: task.status,
          });
        }
      } catch (err) {
        console.error("Error fetching task:", err);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);
  if (loading) {
    return (
      <div
        className="loading"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "95vh",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthorized) {
    return navigate("/unauthorized"); }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`http://localhost:8000/updateTask/${id}`, formData);
        alert("Task updated successfully!");
      } else {
        // Add new task
        await axios.post("http://localhost:8000/addTask", formData);
        alert("Task added successfully!");
      }
      navigate("/");
    } catch (err) {
      console.error("Error adding task:", err);

      // Check if it's a validation error from backend
      if (err.response && err.response.data && err.response.data.error) {
        // Show the specific backend error message
        alert(err.response.data.error);
      } else {
        // Generic error message for other cases
        alert("Failed to add task. Please try again.");
      }
    }
  };

  return (
    <div className="add-task">
      <h1>{id ? "Edit Task" : "Add New Task"}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-control"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
        </div>
        <div className="form-group submit">
          <button type="submit" className="btn btn-sm btn-outline-light">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
