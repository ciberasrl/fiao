import Colmadero from "../../models/colmadero.js";
import { v4 as uuidv4 } from "uuid";

const getColmadero = async (req, res) => {
  try {
    const comaderos = await Colmadero.findAll();

    if (comaderos.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron colmaderos" });
    }

    res
      .status(200)
      .json({ mensaje: "Colamderos encontrados", data: comaderos });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los colmaderos", error });
  }
};

const postColmadero = async (req, res) => {
  try {
    // name, email, password, status_id
    const { name, email, password, status_id } = req.body;
    const newColmadero = await Colmadero.create({
      name,
      email,
      password,
      statusId: status_id,
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

export default { getColmadero, postColmadero, updateNameColmadero };
