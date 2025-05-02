import { DataTypes, ENUM } from "sequelize";

export const createTaskModel = (sequelize) => {
  const task = sequelize.define("Task", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: ENUM("pending", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    priority: {
      type: ENUM("medium", "high"),
      allowNull: false,
      defaultValue: "medium",
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id : {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      }
    },
  });
  return task;
};
