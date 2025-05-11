import HistoricoMensual from "../../models/historicoMensual.js";
import Colmadero from "../../models/colmadero.js";

const actualizarHistoricoMensual = async (req, res) => {
  try {
    const { uuidColmadero } = req.cookies.uuidColmadero;

    if (!uuidColmadero) {
      return res.status(400).json({ error: "Se requiere el uuidColmadero" });
    }

    // Buscar al colmadero
    const colmadero = await Colmadero.findOne({
      where: { uuid: uuidColmadero },
    });

    // Verifico que el colmadero exista
    if (!colmadero) {
      return res.status(404).json({ error: "Colmadero no encontrado" });
    }

    // Obtener los datos del body
    const { deudas, pagos, mes, anio } = req.body;

    // Buscar un registro con estas caracteristicas
    const registroExistente = await HistoricoMensual.findOne({
      where: {
        uuidColmadero,
        mes,
        anio,
      },
    });

    //Si el registro existe pues solo actualizar pagos y deudas
    if (registroExistente) {
      registroExistente.deudas += deudas;
      registroExistente.pagos += pagos;

      // Guardar los cambios en la base de datos
      await registroExistente.save();

      return res.json({
        message: "Registro actualizado",
        registro: registroExistente,
      });
    } else {
      // Si no existe el registro, lo creamos
      const nuevoRegistro = await HistoricoMensual.create({
        uuidColmadero,
        mes,
        anio,
        deudas,
        pagos,
      });

      return res
        .status(201)
        .json({ message: "Registro creado", registro: nuevoRegistro });
    }
  } catch (error) {
    console.error("Error al actualizar o crear el registro:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const obtenerUltimos4Meses = async (req, res) => {
  try {
    // Obtengo el uuidColmadero de la cookie
    const { uuidColmadero } = req.cookies.uuidColmadero;

    if (!uuidColmadero) {
      return res.status(400).json({ error: "Se requiere el uuidColmadero" });
    }

    // Buscar al colmadero
    const colmadero = await Colmadero.findOne({
      where: { uuid: uuidColmadero },
    });

    // Verifico que el colmadero exista
    if (!colmadero) {
      return res.status(404).json({ error: "Colmadero no encontrado" });
    }

    // Obtener los últimos 4 registros del colmadero
    const registros = await HistoricoMensual.findAll({
      where: { uuidColmadero },
      order: [["fecha", "DESC"]],
      limit: 4,
    });

    return res.json({
      message: "Últimos 4 registros del colmadero",
      registros,
    });
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default {
  actualizarHistoricoMensual,
  obtenerUltimos4Meses,
};
