import express from "express";
import cors from "cors";
import routes from "./view/router/routes.js";
import { connection } from "./postgres/postgres.js";
import passport from "./middleware/passport.js";
import { startTaskNotificationCron } from "./cron/taskNotifier.js";
const PORT = 8000;
const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // frontend
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"], // ✅ include Authorization
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port: `, PORT);
});

startTaskNotificationCron();
connection();
