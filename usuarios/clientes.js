const URL_BACKEND = "https://storemaria01.herokuapp.com/clientes";
const BACKEND_LOCAL = 'http://localhost:3001/clientes'

const HTMLResponse = document.querySelector("#app");
const ul = document.createElement("ul");

fetch(BACKEND_LOCAL)
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      let element = document.createElement("li");
      element.appendChild(document.createTextNode(`${user.nombre}`));
      ul.appendChild(element);
    });

    HTMLResponse.appendChild(ul);
  });
