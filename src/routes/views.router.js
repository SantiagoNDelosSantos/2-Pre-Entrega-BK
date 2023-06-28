import { Router } from "express";
import __dirname from "../utils.js"
import ManagerProducts from "../daos/mongodb/ProductsManager.class.js";
import ManagerMessage  from "../daos/mongodb/MessagesManager.class.js";


const managerProducts = new ManagerProducts();
const managerMessage = new ManagerMessage();

const router = Router();

router.get("/", async (req, res) => {

    // Traigo los productos:
    const products = await  managerProducts.consultarProductos();

    // Renderizamos la vista del home con los productos:
    res.render("home", { style: "home.css", title: "Productos", products });

});

router.get("/realtimeproducts", async (req, res) => {

    // Traigo los productos:
    const products = await  managerProducts.consultarProductos();

    // Renderizamos la vista del home con los Productos Actualizados:
    res.render("realTimeProducts", { style: "home.css", title: "Productos Actualizados", products });

});

router.get("/chat", async (req, res) =>{

    // Traigo los mensajes:
    const messages = await managerMessage.verMensajes();

    // Renderizo la vista del chat con los Mensajes Actualizados:
    res.render("chat", { style: "home.css", title: "Mensajes Actualizados", messages });

})

// Exportamos router: 
export default router;