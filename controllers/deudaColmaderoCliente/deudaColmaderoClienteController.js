import Colmadero from "../../models/colmadero.js";
import DeudaColmaderoCliente from "../../models/deudaColmaderoCliente.js";

const getTotalDeudaMes_TotalDeuda = async (req, res) => {
  try {
    // Obtener el uuid del cliente de la url
    const { uuid } = req.params;

    // Buscar el cliente en la base de datos
    const colmadero = await Colmadero.findOne({
      where: { uuid },
    });
    // Verifico si el cliente existe
    if (!colmadero) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    // Busco la deuda del cliente
    const deudaColmaderoCliente = await DeudaColmaderoCliente.findOne({
      where: { uuidColmadero: uuid },
    });
    //No es necesario verificar si existe la deuda, ya que al momento de crear al colmadero se crea la deuda.

    // Devuelvo el total del mes y el total de la deuda
    res.status(200).json({
      mensaje: "Deuda encontrada",
      data: {
        totalDeudaMes: deudaColmaderoCliente.totalMes,
        totalDeuda: deudaColmaderoCliente.totalDeuda,
      },
    });
    // Busco la deuda del cliente
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los colmaderos",
      error: error.message,
    });
  }
};
// const updateTotalDeudaMes_TotalDeuda{

// }

export default {
  getTotalDeudaMes_TotalDeuda,
};
