import express from "express";
const router = express.Router();

import colmaderosController from "../../controllers/colmadero/colmaderoController.js";
router.get("/getColmaderos", colmaderosController.getColmadero);
router.post("/postColmadero", colmaderosController.postColmadero);
router.put("/putNameColmadero", colmaderosController.updateNameColmadero);

export default router;
