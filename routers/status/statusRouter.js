import express from "express";
const router = express.Router();

import statusController from "../../controllers/status/statusController.js";
router.get("/getStatus", statusController.getStatus);
router.post("/postStatus", statusController.postStatus);
// router.delete("/deleteStatus/:id", statusController.deleteStatus); //Desactivada/no usar

export default router;
