import { where } from "sequelize";
import Cliente from "../../models/cliente.js";
import Colmadero from "../../models/colmadero.js";
import { v4 as uuidv4 } from "uuid";

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();

    if (clientes.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron clientes" });
    }

    res.status(200).json({ mensaje: "Clientes encontrados", data: clientes });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener los clientes", error: error.message });
  }
};

const postCliente = async (req, res) => {
  try {
    // name, email, numberPhone, uuidColmadero
    const { name, email, numberPhone, uuidColmadero } = req.body;

    // Verificar si el uuidColmadero existe
    const colmadero = await Colmadero.findOne({
      where: { uuid: uuidColmadero },
    });

    if (!colmadero) {
      return res.status(400).json({ mensaje: "El Colmadero no existe." });
    }

    // Verificar si ya el correo existe
    const clienteExistente = await Cliente.findOne({
      where: { email },
    });
    if (clienteExistente) {
      return res.status(400).json({ mensaje: "El correo ya existe." });
    }

    const uuidQr = uuidv4();

    const newCliente = await Cliente.create({
      name,
      email,
      numberPhone,
      reliability: 0,
      uuidColmadero,
      uuid: uuidv4(),
      token: uuidv4(),
      statusId: 2,
      uuidQr,
      currentQr: `/getInfoCliente/${uuidQr}`,
    });
    res.status(201).json({ mensaje: "Cliente creado", data: newCliente });
  } catch (error) {
    console.error(error); // para consola
    res.status(500).json({
      mensaje: "Error al crear el cliente",
      error: error.message,
      detalles: error.errors || null,
    });
  }
};

const getInfoClienteQr = async (req, res) => {
  try {
    const { idCliente } = req.params;

    const cliente = await Cliente.findOne({
      where: { uuidQr: idCliente },
    });
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.status(200).json({ mensaje: "Cliente encontrado", data: cliente });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los colmaderos",
      error: error.message,
    });
  }
};

export default { getClientes, postCliente, getInfoClienteQr };
