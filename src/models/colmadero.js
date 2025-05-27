import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import bcrypt from "bcrypt";

const Colmadero = db.define(
  "colmadero",
  {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    hooks: {
      beforeCreate: async function (colmadero) {
        const salt = await bcrypt.genSalt(10);
        colmadero.password = await bcrypt.hash(colmadero.password, salt);
      },
    },
  }
);
export default Colmadero;
