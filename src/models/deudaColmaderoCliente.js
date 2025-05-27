import { DataTypes } from "sequelize";
import db from "../config/db.js";

const DeudaColmaderoCliente = db.define("deudaColmaderoCliente", {
  uuid: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  uuidColmadero: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  totalMes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  totalDeuda: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
export default DeudaColmaderoCliente;
