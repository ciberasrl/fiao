import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const DeudaCliente = db.define("deudaCliente", {
  uuid: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  uuidCliente: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  uuidColmadero: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  totalDebito: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  notes: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
});
export default DeudaCliente;
