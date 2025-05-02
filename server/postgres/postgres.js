import { Sequelize } from "sequelize";

import { createTaskModel } from "../model/taskSchema.js";
import { createUserModel } from "../model/userSchema.js";
const sequelize = new Sequelize("todo", "postgres", "coding@123", {
  host: "localhost",
  dialect: "postgres",
  port: 5555,
});

let taskModel = null;
let userModel = null;
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    taskModel = await createTaskModel(sequelize);
    userModel = await createUserModel(sequelize);

    userModel.hasMany(taskModel, { foreignKey: "user_id" });
    taskModel.belongsTo(userModel, { foreignKey: "user_id" });
    await sequelize.sync();
  } catch (error) {
    console.log("error")
    console.error("Unable to connect to the database:", error);
  }
};

export { connection , taskModel, userModel };
