
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.URLPRUEBA;
const ENDPOINT = "auth/login";

const loginData = {
  email: "ejemplo@correo.com",
  password: "tuContraseña",
};

fetch(URL + ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(loginData),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("Respuesta del login:", data);
  })
  .catch((err) => {
    console.error("Error al hacer login:", err);
  });
