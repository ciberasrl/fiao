import sendRequest from "../helper/sendRequest.js";

// name, email, numberPhone
// postCliente
// await sendRequest.sendRequest(
//   "POST",
//   "cliente/",
//   {
//     name: "Cliente Prueba",
//     email: "email.prueba2@gmail.com",
//     numberPhone: "1234567890",
//   },
//   {
//     headers: {
//       Cookie: "uuidColmadero=b2057c54-17d9-465c-9d83-f0953601501e",
//     },
//   }
// );
// await sendRequest.sendRequest(
//   "POST",
//   "cliente/",
//   {
//     name: "Cliente Prueba 2",
//     email: "email.prue2ba2@gmail.com",
//     numberPhone: "12345678s90",
//   },
//   {
//     headers: {
//       Cookie: "uuidColmadero=b2057c54-17d9-465c-9d83-f0953601501e",
//     },
//   }
// );
// await sendRequest.sendRequest(
//   "POST",
//   "cliente/",
//   {
//     name: "Cliente Prueba 3",
//     email: "email.prueba32@gmail.com",
//     numberPhone: "123456ds7890",
//   },
//   {
//     headers: {
//       Cookie: "uuidColmadero=b2057c54-17d9-465c-9d83-f0953601501e",
//     },
//   }
// );
// await sendRequest.sendRequest(
//   "POST",
//   "cliente/",
//   {
//     name: "Cliente Prueba 5",
//     email: "email.prueba2@gm5ail.com",
//     numberPhone: "123234567890",
//   },
//   {
//     headers: {
//       Cookie: "uuidColmadero=b2057c54-17d9-465c-9d83-f0953601501e",
//     },
//   }
// );
// await sendRequest.sendRequest(
//   "POST",
//   "cliente/",
//   {
//     name: "Cliente Prueba 6",
//     email: "email.prueba2@gm65ail.com",
//     numberPhone: "123432567890",
//   },
//   {
//     headers: {
//       Cookie: "uuidColmadero=b2057c54-17d9-465c-9d83-f0953601501e",
//     },
//   }
// );
// await sendRequest.sendRequest(
//     "POST",
//     "cliente/",
//     {
//       name: "Cliente Prueba 32",
//       email: "email.prueba232@gm65ail.com",
//       numberPhone: "12343232567890",
//     },
//     {
//       headers: {
//         Cookie: "uuidColmadero=b2057c54-17d9-465c-9d83-f0953601501e",
//       },
//     }
//   );

// getUltimos4Clientes
await sendRequest.sendRequest("GET", "cliente/nombre-score", null, {
  headers: {
    Cookie: "uuidColmadero=b2057c54-17d9-465c-9d83-f0953601501e",
  },
});

//getInfoClienteQr

await sendRequest.sendRequest(
  "GET",
  "cliente/getInfoCliente/0c4f2b8e-1a3d-4f5b-9a6c-7d0e2f1a3b8e",
  null,
  {
    headers: {
      Cookie: "uuidColmadero=b2057c54-17d9-465c-9d83-f0953601501e",
    },
  }
);
