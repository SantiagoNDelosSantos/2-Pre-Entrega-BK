import express, {
    urlencoded
} from 'express';
import handlebars from "express-handlebars";

import __dirname from "./utils.js";

import routerMessage from './routes/message.router.js'
import routerProducts from './routes/products.router.js';
import routerCart from './routes/cart.router.js'
import viewsRouter from "./routes/views.router.js";

import {
    Server, Socket
} from 'socket.io';

import ManagerProducts from './daos/mongodb/ProductsManager.class.js';
import ManagerMessage from './daos/mongodb/MessagesManager.class.js';

// Iniciamos el servidor:
const app = express();

// Rutas extendidas:
app.use(express.json());
app.use(urlencoded({
    extended: true
}));

// Configuración de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Servidor HTTP:
const expressServer = app.listen(8080, () => {
    console.log(`Servidor iniciado en el puerto 8080.`);
});

// Servidor Socket.io escuchando servidor HTTP:
const socketServer = new Server(expressServer);

export const pdcMANGR = new ManagerProducts();

export const smsMANGR = new  ManagerMessage();

socketServer.on("connection", async (socket) => {

    const products = await pdcMANGR.consultarProductos0();

    const messages = await smsMANGR.verMensajes();

    // Mensaje de nuevo cliente conectado:
    console.log("¡Nuevo cliente conectado!", socket.id)

    //..........................

    // Enviamos los productos al cliente que se conecto: 
    socket.emit("productos", products);

    // Enviamos los mensajes al usuario:
    socket.emit("messages", messages);

    //............................


    ///////////////////////////////

    // Escuchamos el evento addProduct y recibimos el producto:
    socket.on("addProduct", (data) => {

        //Agregamos el producto a la lista de productos:
        products.push(data);

        // Enviamos los productos a todos los clientes conectados:
        socketServer.emit("productos", products);
    })

    // Escuchamos el evento addMessage y recibimos el mensaje:
    socket.on("addMessage", (sms) => {

        // Agregamos el mensaje al chat:
        messages.push(sms);

        // Enviamos al usuario todos los mensajes:
        socketServer.emit("messages", messages);
    })


    ////////////////////////////////

    
    //lllllllllllllllllllllllllllllllll

    // Escuchamos el evento deleteProduct y recibimos el id del producto:
    socket.on("deleteProduct", (id) => {

        // Eliminamos el producto de la lista de productos:
        products.splice(
            products.findIndex((product) => product.id === id), 1
        );

        //Enviamos los productos a todos los clientes conectados:
        socketServer.emit("productos", products);
    })


    // Escuchamos el evento deleteMessage y recibimos el id del mensaje.
    socket.on("deleteMessage", (id) => {

        // Eliminamos el mesaje del chat:
        messages.splice(
            messages.findIndex((message) => message.id === id), 1
        );

        // Enviamos los mensajes a todos los usuarios: 
        socketServer.emit("messages", messages);
    })

    //lllllllllllllllllllllllllllllllllllllll

});

app.use((req, res, next) => {
    req.socketServer = socketServer;
    next()
});

// Rutas:
app.use('/', viewsRouter);
app.use('/api/chat/', routerMessage)
app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCart);
