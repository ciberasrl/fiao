import Transaction from "../../models/transaction.js";
import Colmadero from "../../models/colmadero.js";

const get4Transactions = async (req, res) => {
  try {
    const { uuidColmadero } = req.params;

    // Verifico si el UUID del colmadero está presente en los parámetros de la URL
    if (!uuidColmadero) {
      return res.status(400).json({
        success: false,
        mensaje:
          "El UUID del colmadero es requerido en los parámetros de la URL.",
        data: null,
        camposEsperados: ["uuidColmadero en los parámetros de la URL"],
      });
    }

    // Busco el colmadero en la base de datos
    const colmadero = await Colmadero.findOne({
      where: { uuid: uuidColmadero },
    });

    // Verifico si el colmadero existe
    if (!colmadero) {
      return res.status(404).json({
        success: false,
        mensaje: "Colmadero no encontrado.",
        data: null,
      });
    }

    // Busco las últimas 4 transacciones del colmadero
    const transactions = await Transaction.findAll({
      where: { uuidColmadero },
      limit: 4, // Limito a 4 transacciones
      order: [["createdAt", "DESC"]],
    });

    // Verifico si se encontraron transacciones
    if (!transactions.length) {
      return res.status(404).json({
        success: false,
        mensaje: "No se encontraron transacciones.",
        data: null,
      });
    }

    // Respuesta exitosa con las transacciones encontradas
    return res.status(200).json({
      success: true,
      mensaje: "Transacciones encontradas correctamente.",
      data: transactions,
    });
  } catch (error) {
    console.error("Error en get4Transactions:", error.message);
    return res.status(500).json({
      success: false,
      mensaje: "Error al obtener las transacciones.",
      error: error.message,
      data: null,
    });
  }
};

export default {
  get4Transactions,
};
