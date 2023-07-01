// Iniciar Socket:
const socket = io();

// Captura tabla de carritos
const tableCarts = document.getElementById('tableCarts');

// Agrego al carrito:
function allCarts() {

  console.log("Carga carritos");

  socket.on("carritos", (carts) => {

    let htmlCarritos = "";

    htmlCarritos += `
    <thead>
      <tr>
          <th>Carrito - ID</th>
          <th>Select Cart</th>
      </tr>
    </thead>`;

    carts.docs.forEach((cart) => {
      htmlCarritos += `
        <tr>
          <td>${cart._id}</td>
          <td><p class="boton" id="selt${cart._id}">Select</p></td>
        </tr>`;
    });

    tableCarts.innerHTML = htmlCarritos;

    // Obtengo el id de cada boton Select
    carts.docs.forEach((cart) => {
      const botonSelect = document.getElementById(`selt${cart._id}`);
      botonSelect.addEventListener('click', () => {
        selectCart(cart._id);
      });
    });

    function selectCart(cartID) {
      
      console.log(`Seleccionar carrito: ${cartID}`);

      const url = `/cart/${cartID}`;

      console.log(`${url}`)

      // Redirigir al nuevo URL
      window.location.href = url;
    }

  });
}

allCarts();