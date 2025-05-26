import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

const success = chalk.green.bold;
const error = chalk.red.bold;
const info = chalk.cyan;
const title = chalk.magenta.underline;
const URL = process.env.URLPRUEBA;

async function sendRequest(method, endpoint, body = null, options = {}) {
  const fullURL = URL + endpoint;

  console.log(title(`\n📡 Iniciando petición ${method} a Colmaderos...`));
  console.log(info(`🔗 URL: ${fullURL}`));

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(fullURL, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const statusCode = res.status;
    const data = await res.json();

    console.log(success("\n✅ Respuesta:\n"));
    console.log(info("🔍 Status Code:"), statusCode);
    console.dir(data, { depth: null, colors: true });
  } catch (err) {
    console.error(
      error(`\n❌ Error en la petición ${method} a ${endpoint}:\n`),
      err
    );
  }
}

export default {
  sendRequest,
};
