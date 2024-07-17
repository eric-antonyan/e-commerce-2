import mongoose from "mongoose";
import productsModel from "../models/products.model.js";

export default async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Data", success: false });
    }

    try {
        const product = await productsModel.findById(id);

        let saved = product;

        if (product) {
            const deleted = await productsModel.deleteOne({ _id: product._id });

            if (deleted) {
                return res.status(200).send({ message: "Product successfully deleted!", product: saved, id, success: true, product: deleted });
            } else {
                return res.status(500).send({ message: "Product not deleted!", success: false });
            }
        } else {
            return res.status(404).send({ message: "Product not found", success: false });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "An error occurred", error: err.message, success: false });
    }
};
