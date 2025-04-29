import express from "express";
import { getAllTasks, addTask, updateTask, deleteTask, getTask } from "../../controller/taskController.js";
const router = express.Router();

router.get("/tasks",getAllTasks);
router.post("/addTask",addTask);
router.put("/updateTask/:id",updateTask);
router.delete("/deleteTask/:id",deleteTask);
router.get('/tasks/:id',getTask);


export default router;