import Status from "../../models/status.js";
import { v4 as uuidv4 } from "uuid";

/**
 * @description Obtiene todos los estados disponibles en la base de datos.
 * @route GET /api/status
 * @returns {Object[]} Lista de estados o mensaje de error si no se encuentran.
 */
const getStatus = async (req, res) => {
  try {
    const statuses = await Status.findAll();

    if (statuses.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron estados" });
    }

    res.status(200).json({ mensaje: "Estados encontrados", data: statuses });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los estados", error });
  }
};

/**
 * @description Crea un nuevo estado con el nombre recibido en el cuerpo de la solicitud.
 * @route POST /api/status
 * @param {string} nombre - Nombre del nuevo estado
 * @returns {Object} Estado recién creado o mensaje de error.
 */
const postStatus = async (req, res) => {
  try {
    const { nombre } = req.body;

    const newStatus = await Status.create({
      status: nombre,
      uuid: uuidv4(),
    });

    res.status(201).json({ mensaje: "Estado creado", data: newStatus });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear el estado", error: error.message });
  }
};

/**
 * @description Elimina un estado por su ID (comentado para uso futuro).
 * @route DELETE /api/status/:id
 * @param {number} id - ID del estado a eliminar
 * @returns {string} Mensaje de éxito o error.
 */
// const deleteStatus = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const status = await Status.findByPk(id);

//     if (!status) {
//       return res.status(404).json({ mensaje: "Estado no encontrado" });
//     }

//     await status.destroy();
//     res.status(200).json({ mensaje: "Estado eliminado" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ mensaje: "Error al eliminar el estado", error: error.message });
//   }
// };

export default {
  getStatus,
  postStatus,
  // deleteStatus, // Descomenta si deseas activar esta funcionalidad
};
