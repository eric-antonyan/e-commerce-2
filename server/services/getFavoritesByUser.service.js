import favoritesModel from "../models/favorites.model.js";
import productsModel from "../models/products.model.js";
import usersModel from "../models/users.model.js";

export default async (u, res) => {
  try {
    const user = await usersModel.findOne({ _id: u });

    if (!user) {
      return res.send({
        favorites: null,
        message: "User not found",
        success: false,
      });
    }

    const favorites = await favoritesModel.find({ user: u });

    if (favorites.length === 0) {
      return res.send({
        favorites: null,
        message: "No products found in favorites",
        success: false,
      });
    }

    const filteredFavorites = await Promise.all(favorites.map(async (favorite) => {
      const user = await usersModel.findOne({ _id: favorite.user }).select("_id company verified");
      const product = await productsModel.findOne({ _id: favorite.productId });

      if (!user || !product) {
        return null; // or handle as needed
      }

      const createdProduct = {
        _id: product._id,
        name: product.name,
        price: product.price,
        company: user,
        title: product.title,
        image: product.image,
        description: product.description,
        status: product.status,
        creator: product.creator,
        createdAt: product.createdAt
        // Add other fields from product as needed
      };

      return createdProduct;
    }));

    return res.send({ favorites: filteredFavorites, message: "Products found", success: true });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({
      favorites: null,
      message: "Internal server error",
      success: false,
    });
  }
};
