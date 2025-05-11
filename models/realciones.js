import Cliente from "./cliente.js";
import Colmadero from "./colmadero.js";
import DeudaCliente from "./deudaCliente.js";
import DeudaColmaderoCliente from "./deudaColmaderoCliente.js";
import HistoricoMensual from "./historicoMensual.js";
import Status from "./Status.js";
import Transaction from "./transaction.js";

// === Relaciones de Status ===
Status.hasMany(Cliente, { foreignKey: "statusId" });
Cliente.belongsTo(Status, { foreignKey: "statusId" });

Status.hasMany(Colmadero, { foreignKey: "statusId" });
Colmadero.belongsTo(Status, { foreignKey: "statusId" });

// === Relaciones Cliente-Colmadero ===
// Un colmadero puede tener muchos clientes
Colmadero.hasMany(Cliente, { foreignKey: "uuidColmadero", sourceKey: "uuid" });
Cliente.belongsTo(Colmadero, {
  foreignKey: "uuidColmadero",
  targetKey: "uuid",
});

// === Relaciones Cliente - DeudaCliente ===
// Un cliente puede tener muchas deudas
Cliente.hasMany(DeudaCliente, { foreignKey: "uuidCliente", sourceKey: "uuid" });
DeudaCliente.belongsTo(Cliente, {
  foreignKey: "uuidCliente",
  targetKey: "uuid",
});

// Un colmadero puede tener muchas deudas de clientes
Colmadero.hasMany(DeudaCliente, {
  foreignKey: "uuidColmadero",
  sourceKey: "uuid",
});
DeudaCliente.belongsTo(Colmadero, {
  foreignKey: "uuidColmadero",
  targetKey: "uuid",
});

// === Relaciones Colmadero - DeudaColmaderoCliente ===
Colmadero.hasMany(DeudaColmaderoCliente, {
  foreignKey: "uuidColmadero",
  sourceKey: "id",
});
DeudaColmaderoCliente.belongsTo(Colmadero, {
  foreignKey: "uuidColmadero",
  targetKey: "id",
});

// === Relaciones Colmadero - HistoricoMensual ===
Colmadero.hasMany(HistoricoMensual, {
  foreignKey: "uuidColmadero",
  sourceKey: "id",
});
HistoricoMensual.belongsTo(Colmadero, {
  foreignKey: "uuidColmadero",
  targetKey: "id",
});

// === Relaciones Transacciones ===
// Un colmadero puede tener muchas transacciones
Colmadero.hasMany(Transaction, {
  foreignKey: "uuidColmadero",
  sourceKey: "uuid",
});
Transaction.belongsTo(Colmadero, {
  foreignKey: "uuidColmadero",
  targetKey: "uuid",
});

// Un cliente puede tener muchas transacciones
Cliente.hasMany(Transaction, { foreignKey: "uuidCliente", sourceKey: "uuid" });
Transaction.belongsTo(Cliente, {
  foreignKey: "uuidCliente",
  targetKey: "uuid",
});
