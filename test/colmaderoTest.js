import sendRequest from "../helper/sendRequest.js";

//Post Colmadero
await sendRequest.sendRequest("POST", "colmadero/postColmadero", {
  name: "Colmadero Test",
  email: "Emali.com",
  password: "passwordTest",
});

//Get Colmadero
await sendRequest.sendRequest("GET", "colmadero/getColmaderos");

