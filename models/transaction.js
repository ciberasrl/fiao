import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Transaction = db.define("transaction", {
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  uuidColmadero: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  uuidCliente: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  typeTransaction: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  debit: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  credit: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  notes: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
});
export default Transaction;
