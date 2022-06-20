import { URL_BACKEND } from "./constantes.js";

let regexId = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
document.getElementById("app").addEventListener("click", (e) => {
  e.preventDefault();
  let idCliente = e.target.id;

  if (idCliente.match(regexId)) {
    let overlay = document.getElementById("overlay-alert-delete");
    overlay.classList.add("open-overlay");

    let cancelOrDelete = (event) => {
      let idBtn = event.target.id;

      if (idBtn === "btn-cancel") {
        overlay.classList.remove("open-overlay");
        overlay.removeEventListener("click", cancelOrDelete);
      }

      // Elimiar usuario
      if (idBtn === "btn-confirm") {
        fetch(`${URL_BACKEND}${idCliente}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              window.location.reload();
            }
          });
      }

      //  Editar usuario
      if (idBtn === "btn-edit") {
        document.getElementById("overlay-edit").classList.add("open-overlay");

        document
          .getElementById("off-overlay-edit")
          .addEventListener("click", (e) => {
            window.location.reload();
          });

        // Peticion get para obtener el usuario que queremos editar
        fetch(`${URL_BACKEND}${idCliente}`)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              let inputDocumento = document.getElementById("documento-edit");
              inputDocumento.setAttribute("value", data[0].documentoIdentidad);

              let inputNombre = document.getElementById("nombre-edit");
              inputNombre.setAttribute("value", data[0].nombre);

              data[0].apellido === null || data[0].apellido === ""
                ? null
                : document
                    .getElementById("apellido-edit")
                    .setAttribute("value", data[0].apellido);

              let inputCorreo = document.getElementById("correo-edit");
              inputCorreo.setAttribute("value", data[0].correoElectronico);

              data[0].direccion === null || data[0].direccion === ""
                ? null
                : document
                    .getElementById("direccion-edit")
                    .setAttribute("value", data[0].direccion);

              data[0].telefonosCelulares === null ||
              data[0].telefonosCelulares[0] === ""
                ? null
                : document
                    .getElementById("telefono1-edit")
                    .setAttribute("value", data[0].telefonosCelulares[0]);

              data[0].telefonosCelulares === null ||
              data[0].telefonosCelulares[1] === ""
                ? null
                : document
                    .getElementById("telefono2-edit")
                    .setAttribute("value", data[0].telefonosCelulares[1]);

              let inputFecha = document.getElementById("fecha-edit");
              inputFecha.setAttribute(
                "value",
                data[0].fechaDeNacimiento.substring(0, 10)
              );

              data[0].empresa === null || data[0].empresa === ""
                ? null
                : document
                    .getElementById("empresa-edit")
                    .setAttribute("value", data[0].empresa);

              data[0].nit === null || data[0].nit === ""
                ? null
                : document
                    .getElementById("nit-edit")
                    .setAttribute("value", data[0].nit);
            }
          });

        // Formulario de edicion
        let formularioEdit = document.getElementById("contenedor-form-edit");
        formularioEdit.addEventListener("submit", (e) => {
          e.preventDefault();
          let clienteEdit = new FormData(formularioEdit);

          let nombre = clienteEdit.get("nombre");
          let documentoIdentidad = clienteEdit.get("documentoIdentidad");
          let correoElectronico = clienteEdit.get("correoElectronico");
          let direccion = clienteEdit.get("direccion");
          let fechaDeNacimiento = clienteEdit.get("fechaDeNacimiento");
          let apellido = clienteEdit.get("apellido");
          let telefonos = [
            clienteEdit.get("telefono1"),
            clienteEdit.get("telefono2"),
          ];
          let empresa = clienteEdit.get("empresa");
          let nit = clienteEdit.get("nit");

          let editado = {
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

          // Peticion Put para ejecutar la edicion
          fetch(`${URL_BACKEND}${idCliente}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(editado),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                window.location.reload();
              }
            });
        });
      }
    };

    overlay.addEventListener("click", cancelOrDelete);
  } else {
    null;
  }
});
