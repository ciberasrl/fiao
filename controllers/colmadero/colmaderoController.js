import Colmadero from "../../src/models/colmadero.js";
import { v4 as uuidv4 } from "uuid";

const getNameColmadero = async (req, res) => {
  try {
    const colmadero = req.colmadero;

    if (colmadero.statusId !== 1) {
      return res.status(403).json({
        success: false,
        mensaje: "Este colmadero no está activo actualmente.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      mensaje: "Colmadero encontrado correctamente.",
      data: { name: colmadero.name },
    });
  } catch (error) {
    console.error("Error en getNameColmadero:", error);
    return res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor al obtener el nombre del colmadero.",
      data: null,
      error: error.message,
    });
  }
};

const getColmaderos = async (req, res) => {
  try {
    const colmaderos = await Colmadero.findAll();

    console.log(req);

    if (colmaderos.length === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "No se encontraron colmaderos registrados.",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      mensaje: "Colmaderos recuperados correctamente.",
      data: colmaderos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: "Error al obtener los colmaderos.",
      data: [],
      error: error.message,
    });
  }
};

const postColmadero = async (req, res) => {
  try {
    const { name, email, password } = req.body;



    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: "Faltan datos requeridos para crear el colmadero.",
        data: null,
      });
    }

    const nuevoColmadero = await Colmadero.create({
      name,
      email,
      password,
      statusId: 2,
      uuid: uuidv4(),
      token: uuidv4(),
    });

    return res.status(201).json({
      success: true,
      mensaje: "Colmadero creado correctamente.",
      data: nuevoColmadero,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: "Error al crear el colmadero.",
      data: null,
      error: error.message,
    });
  }
};

const updateNameColmadero = async (req, res) => {
  try {
    const { name, uuid } = req.body;

    if (!name || !uuid) {
      return res.status(400).json({
        success: false,
        mensaje: "Faltan datos requeridos para actualizar el nombre.",
      });
    }

    const resultado = await Colmadero.update({ name }, { where: { uuid } });

    if (resultado[0] === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Colmadero no encontrado o nombre no modificado.",
      });
    }

    return res.status(200).json({
      success: true,
      mensaje: "Nombre del colmadero actualizado correctamente.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: "Error al actualizar el nombre del colmadero.",
      error: error.message,
    });
  }
};

const postActivarColmadero = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) {
      return res.status(400).json({
        success: false,
        mensaje: "UUID del colmadero no proporcionado.",
      });
    }

    const resultado = await Colmadero.update(
      { statusId: 1 },
      { where: { uuid } }
    );

    if (resultado[0] === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Colmadero no encontrado o ya estaba activo.",
      });
    }

    return res.status(200).json({
      success: true,
      mensaje: "Colmadero activado correctamente.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: "Error al activar el colmadero.",
      error: error.message,
    });
  }
};

export default {
  getColmaderos,
  postColmadero,
  updateNameColmadero,
  postActivarColmadero,
  getNameColmadero,
};
