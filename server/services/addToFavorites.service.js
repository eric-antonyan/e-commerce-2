import favoritesModel from "../models/favorites.model.js";
import usersModel from "../models/users.model.js";
import productsModel from "../models/products.model.js";
import mongoose from "mongoose";

export default async (userId, productId, res) => {

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
        console.error("Invalid userId or productId");
        return res.status(400).send({ message: "Invalid Data", success: false });
    }

    try {
        // Fetch product from the database
        const product = await productsModel.findById(productId);

        if (!product) {
            console.error("Product not found");
            return res.status(404).send({ message: "Product not found", success: false });
        }

        // Fetch user from the database

        // Check if the product is already in the favorites
        const fav = await favoritesModel.findOne({ user: userId, productId });

        console.log(fav);

        if (fav) {
            // Remove from favorites
            console.log("Favorite found, removing");
            await favoritesModel.deleteOne({ _id: fav._id });
            return res.status(200).send({ message: "Removed from favorites", success: true, added: false });
        } else {
            // Add to favorites
            console.log("Favorite not found, adding");
            await favoritesModel.create({ user: userId, productId });
            return res.status(200).send({ message: "Added to favorites", success: true, added: true });
        }
    } catch (error) {
        console.error("Error managing favorites:", error);
        return res.status(500).send({ message: "Internal Server Error", success: false });
    }
};
