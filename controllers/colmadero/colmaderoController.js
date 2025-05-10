import Colmadero from "../../models/colmadero.js";
import { v4 as uuidv4 } from "uuid";

/**
 * @description Obtiene todos los colmaderos registrados en la base de datos.
 * @route GET /api/colmadero
 * @returns {Object[]} Lista de colmaderos o mensaje de error si no se encuentran.
 */
const getColmadero = async (req, res) => {
  try {
    const comaderos = await Colmadero.findAll();

    if (comaderos.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron colmaderos" });
    }

    res
      .status(200)
      .json({ mensaje: "Colmaderos encontrados", data: comaderos });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los colmaderos", error });
  }
};

/**
 * @description Crea un nuevo colmadero con los datos proporcionados en el cuerpo de la solicitud.
 * @route POST /api/colmadero
 * @param {string} name - Nombre del colmadero
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Object} El colmadero recién creado o mensaje de error.
 */
const postColmadero = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newColmadero = await Colmadero.create({
      name,
      email,
      password,
      statusId: 2, // Estado por defecto: inactivo o pendiente
      uuid: uuidv4(),
      token: uuidv4(),
    });

    res.status(201).json({ mensaje: "Colmadero creado", data: newColmadero });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear el colmadero", error: error.message });
  }
};

/**
 * @description Actualiza el nombre de un colmadero utilizando su UUID.
 * @route PUT /api/colmadero/update-name
 * @param {string} name - Nuevo nombre del colmadero
 * @param {string} uuid - UUID del colmadero a actualizar
 * @returns {string} Mensaje indicando si se actualizó correctamente o si no fue encontrado.
 */
const updateNameColmadero = async (req, res) => {
  try {
    const { name, uuid } = req.body;

    await Colmadero.update({ name }, { where: { uuid } }).then((result) => {
      if (result[0] === 0) {
        return res.status(404).json({ mensaje: "Colmadero no encontrado" });
      }
      res.status(200).json({ mensaje: "Colmadero actualizado" });
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el colmadero",
      error: error.message,
    });
  }
};

/**
 * @description Activa un colmadero estableciendo su estado a activo (statusId: 1).
 * @route POST /api/colmadero/activar/:uuid
 * @param {string} uuid - UUID del colmadero a activar
 * @returns {string} Mensaje indicando si se activó correctamente o si no fue encontrado.
 */
const postActivarColmadero = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    await Colmadero.update({ statusId: 1 }, { where: { uuid } }).then(
      (result) => {
        if (result[0] === 0) {
          return res.status(404).json({ mensaje: "Colmadero no encontrado" });
        }
        res.status(200).json({ mensaje: "Colmadero activado" });
      }
    );
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al activar el colmadero",
      error: error.message,
    });
  }
};

// Exportar las funciones para su uso en las rutas
export default {
  getColmadero,
  postColmadero,
  updateNameColmadero,
  postActivarColmadero,
};
