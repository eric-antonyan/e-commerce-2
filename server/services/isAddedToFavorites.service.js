import favoritesModel from "../models/favorites.model.js";

export default async (productId, userId, res) => {
    // Validate input
    if (!productId || !userId) {
        return res.status(400).send({ message: "Missing productId or userId", success: false });
    }

    const productIdStr = String(productId);
    const userIdStr = String(userId);

    // Log the parameters
    console.log(`Received productId: ${productIdStr}, user: ${userIdStr}`);

    try {
        const favorite = await favoritesModel.findOne({ productId: productIdStr, user: userIdStr });

        if (favorite) {
            return res.status(200).send({ message: "Favorite already exists", added: true, success: true });
        } else {
            return res.status(200).send({ message: "Favorite does not exist", added: false, success: true });
        }
    } catch (error) {
        console.error(`Error occurred while checking favorite: ${error.message}`);
        return res.status(500).send({ message: "Internal server error", success: false });
    }
};
