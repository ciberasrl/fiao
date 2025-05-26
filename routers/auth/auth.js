import express from "express";
const router = express.Router();

import authController from "../../controllers/auth/login.js";

// Rutas para la autenticación
router.post("/login", authController.postLoginColmadero);
export default router;
