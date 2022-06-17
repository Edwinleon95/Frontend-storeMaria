const BACKEND_LOCAL = "http://localhost:3001/clientes";
const URL_BACKEND = "https://storemaria01.herokuapp.com/clientes";

//Validacion  input Nombre
let inputNombre = document.getElementById("nombre");
let warningNombre = document.getElementById("warning-nombre");
inputNombre.addEventListener("input", (e) => {
  e.preventDefault();
  if (e.target.value.length > 4) {
    inputNombre.classList.add("successful-input");
    warningNombre.classList.remove("warning-activo");
  } else {
    inputNombre.classList.add("warning-input");
    inputNombre.classList.remove("successful-input");
    warningNombre.classList.add("warning-activo");
  }
});

//Validacion  input Documento
let inputDocumento = document.getElementById("documento");
let warningDocumento = document.getElementById("warning-documento");
inputDocumento.addEventListener("input", (e) => {
  e.preventDefault();
  if (e.target.value.length > 7) {
    inputDocumento.classList.add("successful-input");
    warningDocumento.classList.remove("warning-activo");
  } else {
    inputDocumento.classList.add("warning-input");
    inputDocumento.classList.remove("successful-input");
    warningDocumento.classList.add("warning-activo");
  }
});

//Validacion input correo electronico
let regexCorreo =
  /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
let inputCorreo = document.getElementById("correo");
let warningCorreo = document.getElementById("warning-correo");
inputCorreo.addEventListener("input", (e) => {
  e.preventDefault();
  if (e.target.value.match(regexCorreo)) {
    inputCorreo.classList.add("successful-input");
    warningCorreo.classList.remove("warning-activo");
  } else {
    inputCorreo.classList.add("warning-input");
    inputCorreo.classList.remove("successful-input");
    warningCorreo.classList.add("warning-activo");
  }
});

//activar campos extra para persona juridica
let extraInputs = document.getElementById("persona-juridica");
let juridica = document.getElementById("persona");
juridica.addEventListener("click", (e) => {
  e.target.id === "juridica"
    ? extraInputs.classList.add("activo")
    : extraInputs.classList.remove("activo");
});

//Formulario
let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let nuevocliente = new FormData(formulario);
  let nombre = nuevocliente.get("nombre");
  let documentoIdentidad = nuevocliente.get("documentoIdentidad");
  let correoElectronico = nuevocliente.get("correoElectronico");
  let direccion = nuevocliente.get("direccion");
  let fechaDeNacimiento = nuevocliente.get("fechaDeNacimiento");
  let apellido = nuevocliente.get("apellido");
  let telefonos = [
    nuevocliente.get("telefono1"),
    nuevocliente.get("telefono2"),
  ];
  let empresa = nuevocliente.get("empresa");
  let nit = nuevocliente.get("nit");

  //validacion de campos obligatorios para la base de datos
  if (nombre.length < 4) {
    document.getElementById("nombre").classList.add("warning-input");
  }
  if (!correoElectronico || !correoElectronico.match(regexCorreo)) {
    document.getElementById("correo").classList.add("warning-input");
  }
  if (!documentoIdentidad) {
    document.getElementById("documento").classList.add("warning-input");
  }

  if (nombre && documentoIdentidad && correoElectronico) {
    if (!fechaDeNacimiento) {
      fechaDeNacimiento = new Date();
    }
    let body = {
      nombre: nombre,
      documentoIdentidad: documentoIdentidad,
      correoElectronico: correoElectronico,
      direccion: direccion,
      fechaDeNacimiento: fechaDeNacimiento,
      apellido: apellido,
      telefonosCelulares: telefonos,
      empresa: empresa,
      nit: nit,
    };

    fetch(URL_BACKEND, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          document.getElementById("overlay-alert").classList.add("open");
          document
            .getElementById("btn-alert")
            .addEventListener("click", (event) => {
              event.preventDefault();
              window.location.reload();
            });
        }
      });
  }
});
