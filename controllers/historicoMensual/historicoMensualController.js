import HistoricoMensual from "../../models/historicoMensual.js";
import Colmadero from "../../models/colmadero.js";

const actualizarHistoricoMensual = async (req, res) => {
  try {
    const { uuidColmadero } = req.cookies;

    // Verifico si el uuidColmadero está en las cookies
    if (!uuidColmadero) {
      return res.status(400).json({
        success: false,
        mensaje: "Se requiere el uuidColmadero en las cookies.",
        data: null,
        camposEsperados: ["uuidColmadero en cookies"],
      });
    }

    // Busco al colmadero en la base de datos
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

    // Obtener los datos del body
    const { deudas, pagos, mes, anio } = req.body;

    // Busco un registro existente con el uuidColmadero, mes y año
    const registroExistente = await HistoricoMensual.findOne({
      where: {
        uuidColmadero,
        mes,
        anio,
      },
    });

    // Si el registro existe, actualizamos las deudas y pagos
    if (registroExistente) {
      registroExistente.deudas += deudas;
      registroExistente.pagos += pagos;

      // Guardamos los cambios en la base de datos
      await registroExistente.save();

      return res.status(200).json({
        success: true,
        mensaje: "Registro actualizado correctamente.",
        data: registroExistente,
      });
    } else {
      // Si el registro no existe, lo creamos
      const nuevoRegistro = await HistoricoMensual.create({
        uuidColmadero,
        mes,
        anio,
        deudas,
        pagos,
      });

      return res.status(201).json({
        success: true,
        mensaje: "Nuevo registro creado correctamente.",
        data: nuevoRegistro,
      });
    }
  } catch (error) {
    console.error("Error al actualizar o crear el registro:", error.message);
    return res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor al procesar la solicitud.",
      error: error.message,
      data: null,
    });
  }
};

const obtenerUltimos4Meses = async (req, res) => {
  try {
    const { uuidColmadero } = req.cookies;

    // Verifico si el uuidColmadero está en las cookies
    if (!uuidColmadero) {
      return res.status(400).json({
        success: false,
        mensaje: "Se requiere el uuidColmadero en las cookies.",
        data: null,
        camposEsperados: ["uuidColmadero en cookies"],
      });
    }

    // Busco al colmadero en la base de datos
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

    // Obtener los últimos 4 registros del colmadero
    const registros = await HistoricoMensual.findAll({
      where: { uuidColmadero },
      order: [["fecha", "DESC"]],
      limit: 4,
    });

    return res.status(200).json({
      success: true,
      mensaje: "Últimos 4 registros obtenidos correctamente.",
      data: registros,
    });
  } catch (error) {
    console.error("Error al obtener los registros:", error.message);
    return res.status(500).json({
      success: false,
      mensaje: "Error interno al obtener los registros del colmadero.",
      error: error.message,
      data: null,
    });
  }
};

export default {
  actualizarHistoricoMensual,
  obtenerUltimos4Meses,
};
