import { DataTypes } from "sequelize";
import db from "../config/db.js";

const HistoricoMensual = db.define("historicoMensual", {
  uuid: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  uuidColmadero: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mes: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  anio: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  deudas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  pagos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
export default HistoricoMensual;
