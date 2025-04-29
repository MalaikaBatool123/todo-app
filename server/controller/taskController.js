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
  console.log("add task");
  try {
    const { title, description, status, priority, dueDate } = req.body;
    console.log(req.body);
    // Validate due date isn't in the past
    if (dueDate) {
      const currentDate = new Date();
      const selectedDate = new Date(dueDate);

      // Remove time part for comparison
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
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  console.log("twenty");
  try {
    const { id } = req.params;
    console.log(id);
    const { title, description, status, priority, dueDate } = req.body;
    const task = await taskModel.findByPk(id);
    console.log(task);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (dueDate) {
      const currentDate = new Date();
      const selectedDate = new Date(dueDate);

      // Remove time part for comparison
      currentDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        return res.status(400).json({
          error: "Due date cannot be in the past",
        });
      }
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



export const getTask = async (req, res) => {
  console.log("get task");
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