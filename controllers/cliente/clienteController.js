import Cliente from "../../models/cliente.js";
import DeudaCliente from "../../models/deudaCliente.js";
import { v4 as uuidv4 } from "uuid";

//Obtiene los ultimis 4 clientes y su score
const getUltimos4Clientes = async (req, res) => {
  try {
    const colmadero = req.colmadero;

    if (!colmadero || !colmadero.uuid) {
      return res.status(400).json({
        success: false,
        mensaje: "No se encontró el colmadero en la solicitud.",
        data: [],
        hasMore: false,
      });
    }

    console.log("ME ESTAN LLAMANDO");

    const limit = parseInt(req.query.limit) || 4;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { count, rows: clientes } = await Cliente.findAndCountAll({
      where: { uuidColmadero: colmadero.uuid },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      attributes: ["name", "reliability"],
    });

    if (!clientes.length) {
      return res.status(404).json({
        success: false,
        mensaje: "No se encontraron clientes registrados.",
        data: [],
        hasMore: false,
      });
    }

    const hasMore = offset + limit < count;

    return res.status(200).json({
      success: true,
      mensaje: "Clientes recuperados correctamente.",
      data: clientes,
      hasMore,
    });
  } catch (error) {
    console.error(error); // log interno
    return res.status(500).json({
      success: false,
      mensaje: "Error interno al recuperar los clientes.",
      data: [],
      hasMore: false,
    });
  }
};

const postCliente = async (req, res) => {
  try {
    const colmadero = req.colmadero;
    const { name, email, numberPhone } = req.body;

    const clientePorCorreo = await Cliente.findOne({ where: { email } });
    if (clientePorCorreo) {
      return res.status(400).json({
        success: false,
        mensaje: "El correo electrónico ya está registrado.",
        data: null,
      });
    }

    const clientePorTelefono = await Cliente.findOne({
      where: { numberPhone },
    });
    if (clientePorTelefono) {
      return res.status(400).json({
        success: false,
        mensaje: "El número de teléfono ya está registrado.",
        data: null,
      });
    }

    const uuidQr = uuidv4();

    console.log("El uuid del comladero es: ", colmadero.uuid);
    const newCliente = await Cliente.create({
      name,
      email,
      numberPhone,
      reliability: 0,
      uuidColmadero: colmadero.uuid,
      uuid: uuidv4(),
      token: uuidv4(),
      statusId: 2,
      uuidQr,
      currentQr: `/getInfoCliente/${uuidQr}`,
    });

    await DeudaCliente.create({
      uuid: uuidv4(),
      uuidCliente: newCliente.uuid,
      uuidColmadero: colmadero.uuid,
      totalDebito: 0,
      notes: "",
    });

    return res.status(201).json({
      success: true,
      mensaje: "Cliente creado exitosamente.",
      data: newCliente,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje:
        "Ocurrió un error al registrar el cliente. Verifique los datos enviados.",
      data: null,
      error: error.message,
    });
  }
};

const getInfoClienteQr = async (req, res) => {
  try {
    const { uuidQr } = req.params;

    const cliente = await Cliente.findOne({ where: { uuidQr } });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        mensaje:
          "No se encontró ningún cliente con el código QR proporcionado.",
        cliente: null,
        deuda: null,
      });
    }

    if (!cliente.accept_terms_conditions) {
      return res.status(400).json({
        success: false,
        mensaje: "El cliente aún no ha aceptado los términos y condiciones.",
        cliente: null,
        deuda: null,
        redirigirA: `/aceptar-terminos/${uuidQr}`,
      });
    }

    return res.status(200).json({
      success: true,
      mensaje: "Información del cliente recuperada exitosamente.",
      cliente,
      deuda: "Información de la deuda disponible próximamente.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: "Error al recuperar los datos del cliente mediante el QR.",
      cliente: null,
      deuda: null,
      error: error.message,
    });
  }
};

const postAceptTermsConditions = async (req, res) => {
  try {
    const { uuidQr } = req.body;

    const cliente = await Cliente.findOne({ where: { uuidQr } });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        mensaje: "Cliente no encontrado.",
        yaAcepto: false,
        redirigirA: null,
      });
    }

    if (cliente.accept_terms_conditions) {
      return res.status(200).json({
        success: true,
        yaAcepto: true,
        mensaje: "Ya habías aceptado los términos y condiciones.",
        redirigirA: `/getInfoCliente/${uuidQr}`,
      });
    }

    cliente.accept_terms_conditions = true;
    cliente.acceptance_date = new Date();
    await cliente.save();

    return res.status(200).json({
      success: true,
      yaAcepto: true,
      mensaje: "Términos y condiciones aceptados correctamente.",
      redirigirA: `/getInfoCliente/${uuidQr}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: "Error del servidor al registrar la aceptación de términos.",
      yaAcepto: false,
      redirigirA: null,
      error: error.message,
    });
  }
};

const postClientesByUuidColmadero = async (req, res) => {
  try {
    const colmadero = req.colmadero;

    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const offset = (page - 1) * limit;

    const total = await Cliente.count({
      where: { uuidColmadero: colmadero.uuid },
    });

    const clientes = await Cliente.findAll({
      where: { uuidColmadero: colmadero.uuid },
      limit,
      offset,
      include: [{ model: DeudaCliente, attributes: ["totalDebito"] }],
    });

    if (!clientes.length) {
      return res.status(404).json({
        success: false,
        mensaje: "No se encontraron clientes en esta página.",
        clientes: [],
        meta: {
          total,
          page,
          totalPages: Math.ceil(total / limit),
          hasMore: false,
        },
      });
    }

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      mensaje: "Clientes recuperados correctamente.",
      clientes,
      meta: {
        total,
        page,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: "Error al obtener la lista de clientes.",
      clientes: [],
      meta: {
        total: 0,
        page: 1,
        totalPages: 0,
        hasMore: false,
      },
      error: error.message,
    });
  }
};

const postClienteByName = async (req, res) => {
  try {
    const { name } = req.body;
    const colmadero = req.colmadero;

    const cliente = await Cliente.findOne({
      where: { name, uuidColmadero: colmadero.uuid },
      include: [{ model: DeudaCliente, attributes: ["totalDebito"] }],
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        mensaje: "No se encontró un cliente con ese nombre.",
        cliente: null,
      });
    }

    return res.status(200).json({
      success: true,
      mensaje: "Cliente encontrado correctamente.",
      cliente,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: "Error inesperado al buscar al cliente por nombre.",
      cliente: null,
      error: error.message,
    });
  }
};

export default {
  getUltimos4Clientes,
  postClientesByUuidColmadero,
  postCliente,
  getInfoClienteQr,
  postClienteByName,
  postAceptTermsConditions,
};
