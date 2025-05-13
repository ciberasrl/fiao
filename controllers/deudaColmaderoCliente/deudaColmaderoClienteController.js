import Colmadero from "../../models/colmadero.js";
import DeudaColmaderoCliente from "../../models/deudaColmaderoCliente.js";

const getTotalDeudaMes_TotalDeuda = async (req, res) => {
  try {
    const { uuid } = req.params;

    // Verifico si el UUID del colmadero está presente
    if (!uuid) {
      return res.status(400).json({
        success: false,
        mensaje: "UUID del colmadero no proporcionado en la URL.",
        data: null,
        camposEsperados: ["uuid en los parámetros de la URL"],
      });
    }

    // Busco el colmadero en la base de datos
    const colmadero = await Colmadero.findOne({
      where: { uuid },
    });

    // Verifico si el colmadero existe
    if (!colmadero) {
      return res.status(404).json({
        success: false,
        mensaje: "Colmadero no encontrado.",
        data: null,
      });
    }

    // Busco la deuda asociada al colmadero
    const deudaColmaderoCliente = await DeudaColmaderoCliente.findOne({
      where: { uuidColmadero: uuid },
    });

    // Verifico si la deuda existe (aunque debería existir al crear el colmadero)
    if (!deudaColmaderoCliente) {
      return res.status(404).json({
        success: false,
        mensaje: "Deuda del colmadero no encontrada.",
        data: null,
      });
    }

    // Respondo con la deuda total y deuda del mes
    return res.status(200).json({
      success: true,
      mensaje: "Deuda encontrada correctamente.",
      data: {
        totalDeudaMes: deudaColmaderoCliente.totalMes,
        totalDeuda: deudaColmaderoCliente.totalDeuda,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: "Error interno al obtener la deuda del colmadero.",
      data: null,
      error: error.message,
    });
  }
};

export default {
  getTotalDeudaMes_TotalDeuda,
};
