import mongoose from "mongoose";
import productsModel from "../models/products.model.js";

export default async (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Data", success: false })
    }

    const product = await productsModel.findById(id)
    if (!product) {
        return res.status(404).send({ message: "Product not found", success: false })
    } 

    return res.status(200).send({ message: "Product found", product, success: true })
}