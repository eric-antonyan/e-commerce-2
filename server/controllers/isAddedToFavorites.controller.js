import mongoose from "mongoose";
import favoritesModel from "../models/favorites.model.js";

export default async (req, res) => {
    const { productId, userId } = req.body;

    // Validate input
    if (!productId || !userId) {
        console.log("Missing productId or userId");
        return res.status(400).send({ message: "Missing productId or userId", success: false });
    }

    const productIdStr = String(productId);
    const userIdStr = String(userId);

    // Log the parameters
    console.log(`Received productId: ${productIdStr}, userId: ${userIdStr}`);

    try {
        const favorites = await favoritesModel.find({});

        const favorite = favorites.filter(favorite => favorite.productId.equals(new mongoose.Types.ObjectId(productId)))[0]

        console.log(favorites, productId, userId);

        if (favorite) {
            console.log("Favorite already exists");
            return res.status(200).send({ message: "Favorite already exists", added: true, success: true });
        } else {
            console.log("Favorite does not exist");
            return res.status(200).send({ message: "Favorite does not exist", added: false, success: true });
        }
    } catch (error) {
        console.error(`Error occurred while checking favorite: ${error.message}`);
        return res.status(500).send({ message: "Internal server error", success: false });
    }
};
