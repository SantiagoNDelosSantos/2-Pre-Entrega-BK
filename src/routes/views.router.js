import { Router } from "express";
import __dirname from "../utils.js"
import ManagerProducts from "../daos/mongodb/ProductsManager.class.js";
import ManagerMessage  from "../daos/mongodb/MessagesManager.class.js";
import ManagerCarts from "../daos/mongodb/CartManager.class.js";

const managerProducts = new ManagerProducts();
const managerMessage = new ManagerMessage();
const managerCarts = new ManagerCarts();

const router = Router();

router.get("/cart", async (req, res) => {

    // Traigo los productos:
    const carts = await  managerCarts.consultarCarts();

    // Renderizamos la vista del home con los productos:
    res.render("cart", { style: "home.css", title: "Productos", carts });

});

router.get("/realtimeproducts", async (req, res) => {

    try {

        const limit = Number(req.query.limit);
        const page = Number(req.query.page);
        let sort = Number(req.query.sort);
        let filtro = req.query.filtro;
        let filtroVal = req.query.filtroVal;

        const products = await managerProducts.consultarProductos(limit, page, sort, filtro, filtroVal);

        res.render("realTimeProducts", { style: "home.css", title: "Productos Actualizados", products });
    } 
    catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            error: "Error al consultar los productos. Por favor, inténtelo de nuevo más tarde."
        });
    }
});

router.get("/chat", async (req, res) =>{

    // Traigo los mensajes:
    const messages = await managerMessage.verMensajes();

    // Renderizo la vista del chat con los Mensajes Actualizados:
    res.render("chat", { style: "home.css", title: "Mensajes Actualizados", messages });

})

// Exportamos router: 
export default router;