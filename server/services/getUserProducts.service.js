import mongoose from "mongoose";
import productsModel from "../models/products.model.js";
import usersModel from "../models/users.model.js";

export default async (get, res) => {

    if (!mongoose.Types.ObjectId.isValid(get)) {
        return res.status(400).send({ message: "Invalid Data", success: false });
    }

    try {
        const user = await usersModel.findOne({_id: get});

        if (user) {
            const products = await productsModel.find({creator: user._id})
            console.log(user);
            if (products) {
                return res.status(200).send({ message: "User found", products, success: true });
            } else {
                return res.status(404).send({ message: "User not found", success: false });
            }
        } else {
            return res.status(404).send({ message: "User not found", success: false });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "An error occurred", error: err.message, success: false });
    }
}
