// Iniciar Socket:
const socket = io();

// Capturamos el parrafo que va a mostrar el _id del carrito:
const ParrfCart = document.getElementById('ParrfCart');

// Capturamos la tabla de prodcutos del DOM:
const tableCart = document.getElementById('tableCartID');


function obtenerCIDdeURL() {
    const url = window.location.href;
    const urlSplit = url.split('/');
    return urlSplit[urlSplit.length - 1];
}

const cid = obtenerCIDdeURL();

let htmlParf = "";

htmlParf += `<p>(Carrito - ${cid})</p>`;

ParrfCart.innerHTML = htmlParf;



socket.emit("CarritoCID", cid);
console.log(`${cid}`)


socket.on('CCID', (cartCID) => {
    console.log(`${cartCID}`)

});