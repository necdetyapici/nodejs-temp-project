const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");
const defineBaseModel = require("../../core/BaseModel");

const User = defineBaseModel(sequelize, "User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "user", allowNull: false },
});

module.exports = User;
