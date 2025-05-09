import express from "express";
import dotenv from "dotenv";
import NotFund from "./controllers/404.js";
import statusRouter from "./routers/status/statusRouter.js";
import colmaderoRouter from "./routers/colmaderos/colmaderoRouter.js";
import clienteRouter from "./routers/clientes/clienteRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(`/api/${process.env.VERSION}/`, statusRouter);
app.use(`/api/${process.env.VERSION}/`, colmaderoRouter);
app.use(`/api/${process.env.VERSION}/`, clienteRouter);

app.use("/", NotFund);

export default app;
