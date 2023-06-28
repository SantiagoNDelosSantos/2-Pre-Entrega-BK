import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";

export default class ManagerProducts {

    // Conexión Mongoose:
    connection = mongoose.connect('mongodb+srv://santiagodelossantos630:D2jqGLvQZMF9LXbB@cluster0.tmhnws9.mongodb.net/?retryWrites=true&w=majority');

    async crearProducto(info) {
        let result = await productsModel.create(info);
        return result;
    };


    async consultarProductos0() {
        let result = await productsModel.find().lean();
        return result;
    };


    async consultarProductos(limit = 10, page = 1, sort = 0, filtro = null, filtroVal = null) {
        let whereOptions = {};
        if(filtro != '' && filtroVal != ''){
            whereOptions = {[filtro]:filtroVal};
        };
        let result = await productsModel.paginate(whereOptions, {
            limit: limit, page: page, sort: {price: sort}
        });
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