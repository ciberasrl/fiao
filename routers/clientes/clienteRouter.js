import express from "express";
const router = express.Router();
import getUuidColmadero from "../../middlewares/getUuuiColmadero.js";

import clientesController from "../../controllers/cliente/clienteController.js";

// Obtener nombre y score de los últimos 4 clientes
router.get(
  "/nombre-score",
  getUuidColmadero,
  clientesController.getNombreScoreCliente
);

// Crear un nuevo cliente
router.post("/", getUuidColmadero, clientesController.postCliente);

// Obtener información de un cliente por su código QR
router.get("/getInfoCliente/:uuidQr", clientesController.getInfoClienteQr);

// Obtener clientes por UUID del colmadero con paginación
router.get(
  "/page/:page/limit/:limit",
  getUuidColmadero,
  clientesController.getClientesByUuidColmadero
);

export default router;
