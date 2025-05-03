import express from "express";
import {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  getTask,
} from "../../controller/taskController.js";
import passport from "passport";
import jwt from "jsonwebtoken";
// import localStorage from "local-storage";
import authenticateJWT from "../../middleware/authenticateJWT.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send('<a href="/auth/google">Sign in with Google</a>');
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.redirect(`http://localhost:3000/?token=${token}`);
  }
);

router.get("/auth/failure", (req, res) => {
  res.send("Authentication Failed");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logged out successfully",
    redirectUrl: "http://localhost:3000/login", 
  });
});
router.get("/tasks", authenticateJWT, getAllTasks);
router.post("/addTask", authenticateJWT, addTask);
router.put("/updateTask/:id", authenticateJWT, updateTask);
router.delete("/deleteTask/:id", authenticateJWT, deleteTask);
router.get("/tasks/:id", authenticateJWT, getTask);
router.get('/get-profile', authenticateJWT, (req, res) => res.send(req.user));

export default router;
