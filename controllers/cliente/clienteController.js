import Cliente from "../../models/cliente.js";
import Colmadero from "../../models/colmadero.js";
import DeudaCliente from "../../models/deudaCliente.js";
import { v4 as uuidv4 } from "uuid";

const getNombreScoreCliente = async (req, res) => {
  //Devueve el nombre y el score de los ultimos 4 clientes
  //Se debe hacer una secuencia de 4 en 4

  try {
    //Obtengo el uuid
    const colmadero = req.colmadero;
    //Verifico si el uuidColmadero existe

    console.log("Colmadero en el get nombre: ", colmadero);

    //Busco los ultimos clientes del colmadero
    //Limito a 4 clientes
    const clientes = await Cliente.findAll({
      where: { uuidColmadero: colmadero.uuid },
      limit: 4,
      order: [["createdAt", "DESC"]],
      attributes: ["name", "reliability"],
    });

    //Verifico si hay clientes
    if (!clientes.length) {
      return res.status(404).json({ mensaje: "No se encontraron clientes" });
    }

    res.status(200).json({ mensaje: "Clientes encontrados", data: clientes });
  } catch (error) {
    console.error("Error en getNombreScoreCliente:", error.message);
    res
      .status(500)
      .json({ mensaje: "Error al obtener los clientes", error: error.message });
  }
};

const postCliente = async (req, res) => {
  try {
    // name, email, numberPhone, uuidColmadero
    const uuidColmadero = req.uuidColmadero;
    const { name, email, numberPhone } = req.body;

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

    //Verificar si ya el numero existe
    const clienteExistenteNumero = await Cliente.findOne({
      where: { numberPhone },
    });

    if (clienteExistenteNumero) {
      return res.status(400).json({ mensaje: "El numero ya existe." });
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

    const uuid = uuidv4();

    const newDeudaCliente = await DeudaCliente.create({
      uuid,
      uuidCliente: newCliente.uuid,
      uuidColmadero,
      totalDebito: 0,
      notes: "",
    });

    // Crear la deuda del cliente
    res.status(201).json({
      mensaje: "Cliente creado",
      data: newCliente,
    });
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
    //Obtengo el uuidQr del cliente de la url
    const { uuidQr } = req.params;

    //Busco el cliente en la base de datos
    const cliente = await Cliente.findOne({
      where: { uuidQr },
    });

    //Verifico si el cliente existe
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    res.status(200).json({
      mensaje: "Cliente encontrado",
      cliente: cliente,
      deuda: "Informacion de la deuda",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los colmaderos",
      error: error.message,
    });
  }
};

const postClientesByUuidColmadero = async (req, res) => {
  try {
    const colmadero = req.colmadero;

    console.log("Colmadero en getClientesByUuidColmadero: ", colmadero);

    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const offset = (page - 1) * limit;

    // Total de clientes
    const total = await Cliente.count({
      where: { uuidColmadero: colmadero.uuid },
    });

    // Obtener los clientes paginados
    const clientes = await Cliente.findAll({
      where: { uuidColmadero: colmadero.uuid },
      limit,
      offset,
      include: [
        {
          model: DeudaCliente,
          attributes: ["totalDebito"],
        },
      ],
    });

    if (clientes.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron clientes" });
    }

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    res.status(200).json({
      mensaje: "Clientes encontrados",
      clientes: clientes,
      meta: {
        total,
        page,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los clientes",
      error: error.message,
    });
  }
};

const postClienteByName = async (req, res) => {
  try {
    const { name } = req.body;

    const colmadero = req.colmadero;

    const cliente = await Cliente.findOne({
      where: { name, uuidColmadero: colmadero.uuid },
      include: [
        {
          model: DeudaCliente,
          attributes: ["totalDebito"],
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    res.status(200).json({
      mensaje: "Cliente encontrado",
      cliente,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el cliente",
      error: error.message,
    });
  }
};

export default {
  getNombreScoreCliente,
  postClientesByUuidColmadero,
  postCliente,
  getInfoClienteQr,
  postClienteByName,
};
