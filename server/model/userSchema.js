import { DataTypes } from "sequelize";


export const createUserModel = (sequelize) => {
    const user = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return user;
}
