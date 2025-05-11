import Cliente from "../../models/cliente.js";
import Colmadero from "../../models/colmadero.js";
import DeudaCliente from "../../models/deudaCliente.js";

const getDeudaClienteByUuid = async (req, res) => {
  try {
    //Obtener el uuid del cliente de la url
    const { uuid } = req.params;

    //Buscar el cliente en la base de datos
    const cliente = await Cliente.findOne({
      where: { uuid },
    });

    //Verifico si el cliente existe
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    //Busco la deuda del cliente
    // No es necesario verificar si existe la deuda, ya que al momento de crear al cliente se crea la deuda.
    const deudaCliente = await DeudaCliente.findOne({
      where: { uuidCliente: uuid },
    });

    res.status(200).json({ mensaje: "Deuda encontrada", data: deudaCliente });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener la deuda", error: error.message });
  }
};

export default {
  getDeudaClienteByUuid,
};
