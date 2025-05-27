import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Cliente = db.define("cliente", {
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  uuidColmadero: {
    type: DataTypes.UUID,
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
  accept_terms_conditions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  acceptance_date: {
    type: DataTypes.DATE,
  },
});
export default Cliente;
