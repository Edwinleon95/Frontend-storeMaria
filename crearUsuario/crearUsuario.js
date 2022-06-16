const URL_BACKEND = "https://storemaria01.herokuapp.com/clientes";
const BACKEND_LOCAL = "http://localhost:3001/clientes";

let formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  let nuevocliente = new FormData(formulario);

  let cliente = {
    nombre: nuevocliente.get("nombre"),
    documentoIdentidad: nuevocliente.get("documentoIdentidad"),
    correoElectronico: nuevocliente.get("correoElectronico"),
    direccion: nuevocliente.get("direccion"),
    fechaDeNacimiento: nuevocliente.get("fechaDeNacimiento"),
    apellido: nuevocliente.get("apellido"),
    telefonosCelulares: [
      nuevocliente.get("telefono1"),
      nuevocliente.get("telefono2"),
    ],
  };

  fetch(URL_BACKEND, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cliente),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
