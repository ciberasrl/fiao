import Status from "./status.js";
import Colmadero from "./colmadero.js";

// El colmadero tiene un status
Colmadero.hasOne(Status);
// Colmadero.belongsTo(Status);
export { Status, Colmadero };
