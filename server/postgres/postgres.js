import { Sequelize } from "sequelize";

import { createTaskModel } from "../model/taskSchema.js";
const sequelize = new Sequelize("todo", "postgres", "coding@123", {
  host: "localhost",
  dialect: "postgres",
  port: 5555,
});

let taskModel = null;
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    taskModel = await createTaskModel(sequelize);
    await sequelize.sync();
  } catch (error) {
    console.log("error")
    console.error("Unable to connect to the database:", error);
  }
};

export { connection , taskModel};
