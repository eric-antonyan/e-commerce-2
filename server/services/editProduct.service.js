import mongoose from "mongoose";
import productsModel from "../models/products.model.js";

export default async (req, res) => {
    const { id: edit } = req.params;
    const { title, price, description, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(edit)) {
        return res.status(400).send({ message: "Invalid Data", success: false });
    }

    if (title && price && status) {
        try {
            const product = await productsModel.findById(edit);

            if (product) {
                const updated = await productsModel.findOneAndUpdate(
                    { _id: product._id },
                    { title, price, description, status },
                    { new: true } // This option returns the updated document
                );

                if (updated) {
                    return res.status(200).send({ message: "Product successfully updated!", success: true, product: updated });
                } else {
                    return res.status(500).send({ message: "Product not updated!", success: false });
                }
            } else {
                return res.status(404).send({ message: "Product not found", success: false });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: "An error occurred", error: err.message, success: false });
        }
    } else {
        return res.status(400).send({ message: "Please fill all fields", success: false });
    }
};
