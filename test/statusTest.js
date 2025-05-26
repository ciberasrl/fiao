import  sendRequest  from "../helper/sendRequest.js";

//   postStatus,
await sendRequest.sendRequest("POST", "status/postStatus", {
  nombre: "Activo",
});
await sendRequest.sendRequest("POST", "status/postStatus", {
  nombre: "Inactivo",
});

// getStatus

await sendRequest.sendRequest("GET", "status/getStatus");
