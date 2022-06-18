// const BACKEND_LOCAL_GET = "http://localhost:3001/clientes/";
const URL_BACKEND_GET = "https://storemaria01.herokuapp.com/clientes/";

const HTMLResponse = document.querySelector("#app");

//peticion get para rederizar los clientes en la base de datos
fetch(`${URL_BACKEND_GET}true`)
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      const div = document.createElement("div");
      div.setAttribute("id", user.id);

      const documento = document.createElement("p");
      documento.appendChild(
        document.createTextNode(`${user.documentoIdentidad}`)
      );
      div.appendChild(documento);

      const nombre = document.createElement("p");
      nombre.appendChild(document.createTextNode(`${user.nombre}`));
      div.appendChild(nombre);

      const apellido = document.createElement("p");
      apellido.appendChild(
        document.createTextNode(
          `${
            user.apellido === null || user.apellido === "" ? "." : user.apellido
          }`
        )
      );
      div.appendChild(apellido);

      const correo = document.createElement("p");
      correo.appendChild(document.createTextNode(`${user.correoElectronico}`));
      div.appendChild(correo);

      const telefono1 = document.createElement("p");
      telefono1.appendChild(
        document.createTextNode(
          `${
            user.telefonosCelulares === null ||
            user.telefonosCelulares[0] === ""
              ? "."
              : user.telefonosCelulares[0]
          }`
        )
      );
      div.appendChild(telefono1);

      const telefono2 = document.createElement("p");
      telefono2.appendChild(
        document.createTextNode(
          `${
            user.telefonosCelulares === null ||
            user.telefonosCelulares[1] === ""
              ? "."
              : user.telefonosCelulares[1]
          }`
        )
      );
      div.appendChild(telefono2);

      const fecha = document.createElement("p");
      fecha.appendChild(
        document.createTextNode(`${user.fechaDeNacimiento.substring(0, 10)}`)
      );
      div.appendChild(fecha);

      const tipoPersona = document.createElement("p");
      tipoPersona.appendChild(
        document.createTextNode(
          `${
            user.empresa === "" ||
            user.nit === "" ||
            user.empresa === null ||
            user.nit === null
              ? "Natural"
              : "Juridica"
          }`
        )
      );
      div.appendChild(tipoPersona);

      const empresa = document.createElement("p");
      empresa.appendChild(
        document.createTextNode(
          `${user.empresa === "" || user.empresa === null ? "." : user.empresa}`
        )
      );
      div.appendChild(empresa);

      const nit = document.createElement("p");
      nit.appendChild(
        document.createTextNode(
          `${user.nit === "" || user.nit === null ? "." : user.nit}`
        )
      );
      div.appendChild(nit);

      const contenedorBtn = document.createElement("div");
      const id = document.createElement("button");
      contenedorBtn.appendChild(id).setAttribute("id", user.id);
      id.appendChild(document.createTextNode(`Eliminar`));
      div.appendChild(contenedorBtn);

      HTMLResponse.appendChild(div);
    });
  });

// abrir overlay de post nuevos clientes
document.getElementById("swicth-overlay").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("overlay-post").classList.add("overlay-post-on");
});
