import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import NotFund from "./controllers/404.js";
import statusRouter from "./routers/status/statusRouter.js";
import colmaderoRouter from "./routers/colmaderos/colmaderoRouter.js";
import clienteRouter from "./routers/clientes/clienteRouter.js";
import authRouter from "./routers/auth/auth.js";
import "./src/models/realciones.js";
import listEndpoints  from "express-list-endpoints";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/status", statusRouter);
app.use("/api/colmadero", colmaderoRouter);
app.use("/api/cliente", clienteRouter);
app.use("/api/auth", authRouter);

app.use("/", NotFund);

const endpoints = listEndpoints(app);
console.log("Rutas registradas:", endpoints);

export default app;
