import colmadero from "../../src/models/colmadero.js";
import bcrypt from "bcrypt";

const postLoginColmadero = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el correo existe
  const existeColmadero = await colmadero.findOne({
    where: { email },
    attributes: ["password", "statusId", "uuid"],
  });
  if (!existeColmadero) {
    return res.status(400).json({
      success: false,
      mensaje: "El correo electrónico no está registrado.",
      data: null,
    });
  }
  //   Verificar si el colmadero esta activo
  if (existeColmadero.statusId !== 1) {
    return res.status(400).json({
      success: false,
      mensaje: "El colmadero no está activo.",
      data: null,
    });
  }

  // Verificar la contraseña
  const passwordValido = await bcrypt.compare(
    password,
    existeColmadero.password
  );

  if (!passwordValido) {
    return res.status(400).json({
      success: false,
      mensaje: "La contraseña es incorrecta.",
      data: null,
    });
  }
  //Guardar el uuidColmadero en las cookies
  res.cookie("uuid", existeColmadero.uuid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  console.log("Cookie guardada con éxito");

  return res.status(200).json({
    success: true,
    mensaje: "Inicio de sesión exitoso",
  });
};

export default { postLoginColmadero };
