import Cliente from "../../models/cliente.js";
import Colmadero from "../../models/colmadero.js";
import DeudaCliente from "../../models/deudaCliente.js";

const getDeudaClienteByUuid = async (req, res) => {
  try {
    const { uuid } = req.params;

    // Verifico si el UUID fue proporcionado
    if (!uuid) {
      return res.status(400).json({
        success: false,
        mensaje: "El UUID del cliente no ha sido proporcionado.",
        data: null,
      });
    }

    // Buscar el cliente en la base de datos
    const cliente = await Cliente.findOne({ where: { uuid } });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        mensaje: "Cliente no encontrado.",
        data: null,
      });
    }

    // Buscar la deuda asociada al cliente
    const deudaCliente = await DeudaCliente.findOne({
      where: { uuidCliente: uuid },
    });

    if (!deudaCliente) {
      return res.status(404).json({
        success: false,
        mensaje: "Deuda del cliente no encontrada.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      mensaje: "Deuda encontrada correctamente.",
      data: deudaCliente,
    });
  } catch (error) {
    console.error("Error en getDeudaClienteByUuid:", error.message);
    return res.status(500).json({
      success: false,
      mensaje: "Error al obtener la deuda del cliente.",
      data: null,
      error: error.message,
    });
  }
};

export default {
  getDeudaClienteByUuid,
};
