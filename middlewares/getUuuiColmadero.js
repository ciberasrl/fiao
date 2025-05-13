import Colmadero from "../models/colmadero.js";

const getUuidColmadero = async (req, res, next) => {
  try {
    //Obtengo el uuidColmadero de las cookies
    const uuidColmadero = req.cookies.uuidColmadero;

    // Verifico si el uuidColmadero esta en la cookie
    if (!uuidColmadero) {
      return res.status(400).json({
        mensaje: "UUID del colmadero no encontrado en las cookies",
      });
    }

    //Busco el colmadero en la base de datos
    const colmadero = await Colmadero.findOne({
      where: { uuid: uuidColmadero },
    });

    //Verifico si el colmadero existe
    if (!colmadero) {
      return res.status(404).json({
        mensaje: "Colmadero no encontrado",
      });
    }

    // Lo agregas al objeto request para que esté disponible en la siguiente función
    req.uuidColmadero = uuidColmadero;

    next(); // Llama a la siguiente función en la cadena de middleware
  } catch (error) {
    console.error("Error en getUuidColmadero:", error.message);
    return res.status(500).json({
      mensaje: "Error al procesar la cookie",
      error: error.message,
    });
  }
};

export default getUuidColmadero;
