// Iniciar Socket:
const socket = io();

// Capturas del DOM:

// Captura para tabla de filtros DOM:
const tableFil = document.getElementById('tableFil');

// Captura para tabla de productos DOM:
const table = document.getElementById('table');

// Capturas paginación DOM:
const Pags = document.getElementById('Pags');

////////////////////////////////////

// Capturas para Imputs de los filtros: 

const limit = document.getElementById('limit');
const page = document.getElementById("page");
const sort = document.getElementById("sort");
const filtro = document.getElementById("filtro");
const filtroVal = document.getElementById("filtroVal");
const filtrar = document.getElementById("filtrar");
const limpiarFiltros = document.getElementById("limpiarFiltros");


// Envio los valores de los inputs a server.js:

function filtrarProducts() {

  const busquedaProducts = {
    limit: limit.value || 10,
    page: page.value || 1,
    sort: sort.value || 1,
    filtro: filtro.value || null,
    filtroVal: filtroVal.value || null,
  }

  socket.emit('busquedaFiltrada', busquedaProducts);

  return busquedaProducts;

}

// Llamo a la función que envia los filtros a server.js:

filtrar.addEventListener('click', (e) => {
  e.preventDefault();
  filtrarProducts();
});


// Limpiar filtros: 

function cleanFiltrarProducts() {

  const busquedaProducts = {
    limit: limit.value = "" || 10,
    page: page.value = ""  || 1,
    sort: sort.value = ""  || 1,
    filtro: filtro.value = "" || null,
    filtroVal: filtroVal.value = ""  || null,
  }

  socket.emit('busquedaFiltrada', busquedaProducts);

  return busquedaProducts;

}

// Llamo a la función que envia los filtros a server.js:

limpiarFiltros.addEventListener('click', (e) => {
  e.preventDefault();
  cleanFiltrarProducts()
});





///////////////////////////////////


// Escucho el evento productos enviado por el server.js(servidor):

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

  // Recorro data y creo una card por cada productos

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






// Paginación de abajo:

socket.on('numberPAG', (page) => {

  let htmlPag = "";

  // Mostramos el número de página en el HTML
  htmlPag +=
    `<h2 class="pag" id="Prev">Prev</h2>
  <h2 class="pag pagNumber" id="numberPag">${page}</h2>
  <h2 class="pag" id="Next">Next</h2>`;

  // Insertamos el número de página en el elemento HTML
  Pags.innerHTML = htmlPag;

  // Capturamos los elementos de los botones "Prev" y "Next"
  const prevButton = document.getElementById('Prev');
  const nextButton = document.getElementById('Next');

  // Cambiar Pag Prev:

  function cambiarPagina(newPage) {
    // Establecer newPage a 1 si es menor que 1:
    if (newPage < 1) {
      newPage = 1;
    }
  
    const busquedaProducts = {
      limit: limit.value || 10,
      page: Number(newPage),
      sort: sort.value || 0,
      filtro: filtro.value || null,
      filtroVal: filtroVal.value || null,
    }
  
    socket.emit('busquedaFiltrada', busquedaProducts);
  
    // Actualizar el valor del input de página
    const pageInput = document.getElementById('page');
    pageInput.value = newPage.toString();
  }
  
  // Agregamos event listeners a los botones
  prevButton.addEventListener('click', () => {
    cambiarPagina(page - 1); // Llamamos a la función para cambiar a la página anterior
  });
  
  nextButton.addEventListener('click', () => {
    cambiarPagina(page + 1); // Llamamos a la función para cambiar a la página siguiente
  });
  

});

