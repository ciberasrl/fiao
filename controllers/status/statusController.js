import Status from "../../models/status.js";
import { v4 as uuidv4 } from "uuid";

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

const postStatus = async (req, res) => {
  try {
    const { nombre } = req.body;
    const newStatus = await Status.create({ status: nombre, uuid: uuidv4() });
    res.status(201).json({ mensaje: "Estado creado", data: newStatus });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear el estado", error: error.message });
  }
};

const deleteStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).json({ mensaje: "Estado no encontrado" });
    }
    await status.destroy();
    res.status(200).json({ mensaje: "Estado eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el estado", error: error.message });
  }
};

export default {
  getStatus,
  postStatus,
  deleteStatus,
};
