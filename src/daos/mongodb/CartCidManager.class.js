import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";

export default class ManagerCartCID{

    connection = mongoose.connect('mongodb+srv://santiagodelossantos630:D2jqGLvQZMF9LXbB@cluster0.tmhnws9.mongodb.net/?retryWrites=true&w=majority');

    async consultaCartCID(cid) {
        const result = await cartModel.findOne({_id: cid}).populate('products.product');
        return result;
    };

}