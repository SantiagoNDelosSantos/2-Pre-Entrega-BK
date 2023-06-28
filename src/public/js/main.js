// Iniciar Socket:
const socket = io();

// Capturas del DOM:
const table = document.getElementById('table');
const btmAgregar = document.getElementById('btnAdd')

// Captura para paginación DOM: 
const prevPageButton = document.getElementById('prevPageButton');
const nextPageButton = document.getElementById('nextPageButton');

// Escucha el evento product enviado por el servidor
socket.on("productos", (data) => {

  let htmlProductos = "";

  //Recorremos los productos y los mostramos en el HTML:
  htmlProductos += `
    <thead>
      <tr>
          <th>Modelo</th>
          <th>Descripción</th>
          <th>Img Front</th>  
          <th>Img Back</th> 
          <th>Stock</th>
          <th>Precio</th>
          <th>Cart</th>
      </tr>
    </thead>`;


      data.docs.forEach((product) => {
        htmlProductos += `
          <tr>
            <td>${product.title}</td>
            <td class="description">${product.description}</td>
            <td><img src="${product.thumbnails[0]}" alt="${product.title}" class="Imgs"></td>
            <td><img src="${product.thumbnails[1]}" alt="${product.title}" class="Imgs"></td>
            <td>${product.stock} Und.</td>
            <td>$${product.price}</td>
            <td><p class="boton">+ Cart</p></td>
          </tr>`;
      });

  //Insertamos los productos en el HTML
  table.innerHTML = htmlProductos;

});


// Función para cargar los productos con los parámetros de búsqueda
function cargarProductos() {
  const parametrosBusqueda = obtenerParametrosBusqueda();
  socket.emit("getProductos", parametrosBusqueda);
}

// Agregar eventos a los botones de paginación
prevPageButton.addEventListener("click", () => {
  const currentPage = Number(pageInput.value);
  if (currentPage > 1) {
    pageInput.value = currentPage - 1;
    cargarProductos();
  }
});

nextPageButton.addEventListener("click", () => {
  const currentPage = Number(pageInput.value);
  const totalPages = Number(document.getElementById("totalPages").value);
  if (currentPage < totalPages) {
    pageInput.value = currentPage + 1;
    cargarProductos();
  }
});