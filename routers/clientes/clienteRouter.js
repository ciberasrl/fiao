import express from "express";
const router = express.Router();
import getColmaderoByCookie from "../../middlewares/getColmaderoByCookie.js";

import clientesController from "../../controllers/cliente/clienteController.js";

// Obtener nombre y score de los últimos 4 clientes
router.get(
  "/nombre-score",
  getColmaderoByCookie,
  clientesController.getUltimos4Clientes
);

// Crear un nuevo cliente
router.post("/", getColmaderoByCookie, clientesController.postCliente);

// Obtener información de un cliente por su código QR
router.get("/getInfoCliente/:uuidQr", clientesController.getInfoClienteQr);

// Aceptar términos y condiciones por parte del cliente
router.post("/aceptar-terminos", clientesController.postAceptTermsConditions);

// Obtener clientes por UUID del colmadero con paginación (cambiar a POST si así lo deseas)
router.post(
  "/listado",
  getColmaderoByCookie,
  clientesController.postClientesByUuidColmadero
);

// Buscar cliente por nombre
router.post(
  "/buscar-por-nombre",
  getColmaderoByCookie,
  clientesController.postClienteByName
);

export default router;
