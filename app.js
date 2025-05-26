import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import NotFund from "./controllers/404.js";
import statusRouter from "./routers/status/statusRouter.js";
import colmaderoRouter from "./routers/colmaderos/colmaderoRouter.js";
import clienteRouter from "./routers/clientes/clienteRouter.js";
import authRouter from "./routers/auth/auth.js";
import "./models/realciones.js";
import cors from "cors";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://127.0.0.1:5500" }));
}
// const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5500", // O "*", si solo pruebas local
    credentials: true,
  })
);
app.options("*", cors()); // Para preflight requests

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/status", statusRouter);
app.use("/api/colmadero", colmaderoRouter);
app.use("/api/cliente", clienteRouter);
app.use("/api/auth", authRouter);

app.use("/", NotFund);

export default app;
