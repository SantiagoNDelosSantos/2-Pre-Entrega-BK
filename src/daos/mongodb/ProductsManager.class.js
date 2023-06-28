import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";

export default class ManagerProducts {

    // Conexión Mongoose:
    connection = mongoose.connect('mongodb+srv://santiagodelossantos630:D2jqGLvQZMF9LXbB@cluster0.tmhnws9.mongodb.net/?retryWrites=true&w=majority');

    async crearProducto(info) {
        let result = await productsModel.create(info);
        return result;
    };

    async consultarProductos() {
        let result = await productsModel.find().lean();
        return result;
    };

    async consultarProductoPorId(id) {
        let result = await productsModel.findOne({
            _id: id
        });
        return result;
    };

    async actualizarProducto(pid, updateProduct) {
        let result = await productsModel.updateOne(
        { _id: pid }, 
        { $set: updateProduct }
        );
        return result;
    };

    async eliminarProducto(pid) {
        let result = await productsModel.deleteOne({_id: pid})
        return result;
    };
}