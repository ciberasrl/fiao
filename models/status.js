import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Status = db.define("status", {
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});
export default Status; 
