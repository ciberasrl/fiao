import Status from "../../models/status.js";
import { v4 as uuidv4 } from "uuid";

const getStatus = async (req, res) => {
  try {
    // Obtengo todos los estados desde la base de datos
    const statuses = await Status.findAll();

    // Verifico si se encontraron estados
    if (statuses.length === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "No se encontraron estados.",
        data: null,
      });
    }

    // Respuesta exitosa con los estados encontrados
    return res.status(200).json({
      success: true,
      mensaje: "Estados encontrados correctamente.",
      data: statuses,
    });
  } catch (error) {
    console.error("Error al obtener los estados:", error.message);
    return res.status(500).json({
      success: false,
      mensaje: "Error al obtener los estados.",
      error: error.message,
      data: null,
    });
  }
};

const postStatus = async (req, res) => {
  try {
    const { nombre } = req.body;

    // Verifico que el nombre esté presente en la solicitud
    if (!nombre) {
      return res.status(400).json({
        success: false,
        mensaje: "El nombre del estado es obligatorio.",
        data: null,
        camposEsperados: ["nombre en el body de la solicitud"],
      });
    }

    // Creo un nuevo estado en la base de datos
    const newStatus = await Status.create({
      status: nombre,
      uuid: uuidv4(),
    });

    // Respuesta exitosa con el nuevo estado creado
    return res.status(201).json({
      success: true,
      mensaje: "Estado creado correctamente.",
      data: newStatus,
    });
  } catch (error) {
    console.error("Error al crear el estado:", error.message);
    return res.status(500).json({
      success: false,
      mensaje: "Error al crear el estado.",
      error: error.message,
      data: null,
    });
  }
};

export default {
  getStatus,
  postStatus,
};
