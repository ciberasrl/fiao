import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { MAX } from "uuid";

const Cliente = db.define("cliente", {
  uuid: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  uuidColmadero: {
    type: DataTypes.STRING(30),
    allowNull: false,
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
  numberPhone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  reliability: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  uuidQr: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  currentQr: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  statusId: {
    type: DataTypes.INTEGER,
  },
});
export default Cliente;
