import Transaction from "../../models/transaction.js";
import Colmadero from "../../models/colmadero.js";

const get4Transactions = async (req, res) => {
  try {
    // Obtener el UUID del colmadero de ala url
    const uuidColmadero = req.params.uuidColmadero;

    //Busco al colmadero en la base de datos
    const colmadero = await Colmadero.findOne({
      where: { uuid: uuidColmadero },
    });

    // Verifico si el colmadero existe
    if (!colmadero) {
      return res.status(404).json({ mensaje: "Colmadero no encontrado" });
    }

    //Busco las ultimas 4 transacciones del colmadero
    const transactions = await Transaction.findAll({
      where: { uuidColmadero },
      limit: 4, // Limito a 4 transacciones
      order: [["createdAt", "DESC"]],
    });

    // Verifico si hay transacciones
    if (!transactions.length) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron transacciones" });
    }

    //Devuelvo las transacciones
    res
      .status(200)
      .json({ mensaje: "Transacciones encontradas", data: transactions });
  } catch (error) {
    console.error("Error en get4Transactions:", error.message);
    res.status(500).json({
      mensaje: "Error al obtener las transacciones",
      error: error.message,
    });
  }
};

export default {
  get4Transactions,
};
