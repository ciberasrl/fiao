import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import NotFund from "./controllers/404.js";
import statusRouter from "./routers/status/statusRouter.js";
import colmaderoRouter from "./routers/colmaderos/colmaderoRouter.js";
import clienteRouter from "./routers/clientes/clienteRouter.js";
import "./models/realciones.js";


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/status", statusRouter);
app.use("/api/colmadero", colmaderoRouter);
app.use("/api/cliente", clienteRouter);

app.use("/", NotFund);

export default app;
