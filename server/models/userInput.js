const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserInput = sequelize.define("UserInput", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserInput;
