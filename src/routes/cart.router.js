import { Router } from "express";
import ManagerCarts from "../daos/mongodb/CartManager.class.js";;

const router = Router();
const managerCarts = new ManagerCarts();

router.get("/:id", async (req, res) =>{
    const id = req.params.id;
    const cart = await managerCarts.consultarCartPorId(id);
    res.send(cart);
});

router.get("/", async (req, res) => {
    const carts = await managerCarts.consultarCarts();
    res.send(carts);
});

router.post("/", async (req, res) => {
    await managerCarts.crearCart();
    res.send({ status: "Success."});
});

router.post('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid

    await managerCarts.agregarProductoEnCarrito(cartId, productId)
    res.send({status: 'Success.'})
}); 

export default router;