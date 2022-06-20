

//Select orden alfabetico
document.getElementById("orden-alfabetico").addEventListener("change", (e) => {
  e.preventDefault();
  if (e.target.value === "a-z") {
    let divContent = document.getElementById("app");
    let clientes = divContent.getElementsByTagName("div");
    let nombresClientes = Array.from(clientes);
    nombresClientes = nombresClientes.filter(
      (elemento) => elemento.title.length > 0
    );
    nombresClientes
      .sort((a, b) => a.title.localeCompare(b.title))
      .forEach((nombre) => divContent.appendChild(nombre));
  }
  if (e.target.value === "z-a") {
    let divContent = document.getElementById("app");
    let clientes = divContent.getElementsByTagName("div");
    let nombresClientes = Array.from(clientes);
    nombresClientes = nombresClientes.filter(
      (elemento) => elemento.title.length > 0
    );
    nombresClientes
      .sort((a, b) => a.title.localeCompare(b.title))
      .reverse()
      .forEach((nombre) => divContent.appendChild(nombre));
  }
});
