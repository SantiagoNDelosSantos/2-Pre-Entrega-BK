// Iniciar Socket:
const socket = io();

// Capturas del DOM:
const table = document.getElementById('table');
const btmAgregar = document.getElementById('btnAdd')

// Escucha el evento product enviado por el servidor
socket.on("productos", (data) => {

  let htmlProductos = "";

  //Recorremos los productos y los mostramos en el HTML:
  htmlProductos += `
    <thead>
      <tr>
          <th>Modelo</th>
          <th>Descripción</th>
          <th>Code</th>
          <th>Precio</th>
          <th>Unidades Disponibles</th>
          <th>Categoría</th>
          <th>Eliminar</th>
      </tr>
    </thead>`;

  data.forEach((product) => {
    htmlProductos += `
    <tbody>
      <tr>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.code}</td>
        <td>$${product.price}</td>
        <td>${product.stock} Und.</td>
        <td>${product.category}</td>
        <td><button type="submit" id=${product.id} class="btnDelete boton" >Eliminar</button></td>
      </tr>
    </tbody>`;
  })

  //Insertamos los productos en el HTML
  table.innerHTML = htmlProductos;

  // Agregar evento click al botón de eliminar
  const deleteButtons = document.getElementsByClassName(`btnDelete`);

  for (let button of deleteButtons) {
    button.addEventListener("click", () => {
      socket.emit("deleteProduct", button.getAttribute("id"));
    });
  }

});

// Agregar producto:

// Escuchamos el evento addProduct y recibimos el producto:

btmAgregar.addEventListener("click", (e) => {
  e.preventDefault();

  // Obtenemos los valores de los inputs:
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("unds").value;
  const category = document.getElementById("category").value;

  // Validamos que los campos estencompletados:
  if (title === "" || description === "" || code === "" || price === "" || unds === "" || category === "") {
    alert("Todos los campos son obligatorios");
  } else {
    // Creamos el producto:
    const product = {
      title,
      description,
      code,
      price,
      stock,
      category,
    };

    // Enviar el evento "addProduct" al servidor con los datos del producto
    socket.emit("addProduct", product);

    // Reseteamos los inputs:
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("code").value = "";
    document.getElementById("price").value = "";
    document.getElementById("unds").value = "";
    document.getElementById("category").value = "";

  }

})