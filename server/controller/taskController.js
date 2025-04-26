
import { taskModel } from "../postgres/postgres.js";
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.findAll();
    if (tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addTask = async (req, res) => {
    console.log("add task")
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const newTask = await taskModel.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
    console.log("first")
  try {
    const { id } = req.params;
    console.log(id);
    const { title, description, status, priority, dueDate } = req.body;
    const task = await taskModel.findByPk(id);
    console.log(task)
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.dueDate = dueDate;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};