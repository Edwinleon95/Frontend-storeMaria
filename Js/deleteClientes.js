
const BACKEND_LOCAL_DELETE = "http://localhost:3001/clientes/";
const URL_BACKEND_DELETE = "https://storemaria01.herokuapp.com/clientes";

let regexId = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
document.getElementById("app").addEventListener("click", (e) => {
  e.preventDefault();
  let idCliente = e.target.id;
  if (idCliente.match(regexId)) {
    let overlay = document.getElementById("overlay-alert-delete");
    overlay.classList.add("open");

    let cancelOrDelete = (event) => {
      let idBtn = event.target.id;

      if (idBtn === "btn-cancel") {
        overlay.classList.remove("open");
        overlay.removeEventListener("click", cancelOrDelete);
      }
      if (idBtn === "btn-confirm") {
        fetch(`${URL_BACKEND_DELETE}${idCliente}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              window.location.reload();
            }
          });
      }
    };
    overlay.addEventListener("click", cancelOrDelete);
  } else {
    null;
  }
});