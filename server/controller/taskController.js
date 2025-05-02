import { where } from "sequelize";
import { taskModel, userModel } from "../postgres/postgres.js";
export const getAllTasks = async (req, res) => {
  // console.log("re user: ", req.user);
  // const { email } = req.user;
  // const user = await userModel.findOne({ where: { email: email } });

  try {
    const tasks = await taskModel.findAll({ where: { user_id: req.user.id } });
    // const tasks = await taskModel.findAll();
    if (tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addTask = async (req, res) => {
  // const user = await userModel.findOne({ where: { email: req.user.email } });

  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (dueDate) {
      const currentDate = new Date();
      const selectedDate = new Date(dueDate);
      currentDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        return res.status(400).json({
          error: "Due date cannot be in the past",
        });
      }
    }

    const newTask = await taskModel.create({
      title,
      description,
      status: status || "pending",
      priority,
      dueDate: dueDate || null,
      user_id: req.user.id || null,
    });
    console.log("newTask: ", newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    // 1. First verify the task exists and belongs to user
    const task = await taskModel.findOne({ 
      where: { id }
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized - You don't own this task" });
    }

    // 2. Validate due date if provided
    if (dueDate) {
      const currentDate = new Date();
      const selectedDate = new Date(dueDate);
      
      currentDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        return res.status(400).json({
          error: "Due date cannot be in the past",
        });
      }
    }

    // 3. Prepare update data
    const updateData = {
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
      priority: priority || task.priority,
      dueDate: dueDate || task.dueDate
    };

    const [updatedCount] = await taskModel.update(updateData, {
      where: { id, user_id: req.user.id },
      returning: true // For PostgreSQL to return the updated record
    });

    if (updatedCount === 0) {
      return res.status(500).json({ error: "Failed to update task" });
    }

    const updatedTask = await taskModel.findByPk(id);
    res.status(200).json(updatedTask);

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message 
    });
  }
};
export const deleteTask = async (req, res) => {
  console.log("in delete");
  try {
    // First check if task exists and belongs to user
    const task = await taskModel.findOne({
      where: { 
        id: req.params.id
      }
    });

    if (!task) {
      return res.status(404).json({ 
        error: "Task not found" 
      });
    }

    if (task.user_id !== req.user.id) {
      return res.status(403).json({ 
        error: "Unauthorized - You don't own this task" 
      });
    }

    // If checks pass, delete the task
    await task.destroy();
    
    res.status(200).json({ 
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message 
    });
  }
};
export const getTask = async (req, res) => {
  // console.log("get task");
  try {
    const { id } = req.params;
    const task = await taskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
