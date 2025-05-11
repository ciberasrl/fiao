import express from "express";
const router = express.Router();

import colmaderosController from "../../controllers/colmadero/colmaderoController.js";
router.get("/getColmaderos", colmaderosController.getColmaderos);
router.post("/postColmadero", colmaderosController.postColmadero);
router.put("/putNameColmadero", colmaderosController.updateNameColmadero);
router.post(
  "/postActivarColmadero/:uuid",
  colmaderosController.postActivarColmadero
);
router.get("/getNameColmadero", colmaderosController.getNameColmadero);

export default router;
