import express from "express";
const router = express.Router();

import clientesController from "../../controllers/cliente/clienteController.js";
router.get("/getClientes", clientesController.getClientes);
router.post("/postClientes", clientesController.postCliente);
router.get("/getInfoCliente/:idCliente", clientesController.getInfoClienteQr);

export default router;
