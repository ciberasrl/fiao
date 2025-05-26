import Colmadero from "../models/colmadero.js";

const getUuidColmadero = async (req, res, next) => {
  try {
    // Obtengo el uuidColmadero de las cookies
    const uuidColmadero = req.cookies.uuidColmadero;

    // Verifico si el uuidColmadero está presente en las cookies
    if (!uuidColmadero) {
      return res.status(400).json({
        success: false,
        mensaje: "UUID del colmadero no encontrado en las cookies",
        data: null,
        redirigirA: "/login",
      });
    }

    // Busco el colmadero en la base de datos
    const colmadero = await Colmadero.findOne({
      where: { uuid: uuidColmadero },
      attributes: ["uuid", "name", "statusId"], // Puedes agregar más atributos si es necesario
    });

    // Verifico si el colmadero existe
    if (!colmadero) {
      return res.status(404).json({
        success: false,
        mensaje: "Colmadero no encontrado",
        data: null,
      });
    }

    // Agrego el colmadero al objeto request para que esté disponible en la siguiente función
    req.colmadero = colmadero.dataValues;

    // Paso al siguiente middleware o controlador
    next();
  } catch (error) {
    console.error("Error en getUuidColmadero:", error.message);
    return res.status(500).json({
      success: false,
      mensaje: "Error al procesar la cookie",
      error: error.message,
      data: null,
    });
  }
};

export default getUuidColmadero;
