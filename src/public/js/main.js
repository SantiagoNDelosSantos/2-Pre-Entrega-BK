// Iniciar Socket:
const socket = io();

// Capturas del DOM:

// Captura para tabla de filtros DOM:
const tableFil = document.getElementById('tableFil');

// Captura para tabla de productos DOM:
const table = document.getElementById('table');

// Capturas paginación DOM:
const prevPageButton = document.getElementById('Prev');
const numberPagElement = document.getElementById('numberPag');
const nextPageButton = document.getElementById('Next');

    ////////////////////////////////////

//Capturas para Imputs de los filtros: 

const limit = document.getElementById('limit');
const page = document.getElementById("page");
const sort = document.getElementById("sort");
const filtro = document.getElementById("filtro");
const filtroVal = document.getElementById("filtroVal");
const filtrar = document.getElementById("filtrar");
const limpiarFiltros = document.getElementById("limpiarFiltros");


function filtrarProducts() {
  const busquedaProducts = {
    limit: limit.value || 10,
    page: page.value || 1,
    sort: sort.value || 0,
    filtro: filtro.value || null,
    filtroVal: filtroVal.value || null,
  }

  console.log(busquedaProducts)
  socket.emit('busquedaFiltrada', busquedaProducts);
}

filtrar.addEventListener('click', (e) => {
  e.preventDefault();
  filtrarProducts();
});














    ///////////////////////////////////


// Escucha el evento product enviado por el servidor
socket.on("productos", (data) => {

  console.log(data)

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

