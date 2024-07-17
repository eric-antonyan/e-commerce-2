import cartModel from "../models/cart.model.js";
import productsModel from "../models/products.model.js";
import usersModel from "../models/users.model.js";

const getCartByUserService = async (userId) => {
  const cart = await cartModel.find({ userId });
  console.log(cart);

  if (cart) {

    const filteredCart = await Promise.all(cart.map(async (cart) => {
        const user = await usersModel.findOne({ _id: cart.userId }).select("_id company verified");
        const product = await productsModel.findOne({ _id: cart.productId });
  
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
          createdAt: product.createdAt,
          count: cart.count
        };
  
        return createdProduct;
      }));

    return {
        message: "Cart found",
        cartCount: cart.length,
        success: true,
        cart: filteredCart
    }
  } else {
    return {
      message: "Cart not found",
      cartCount: 0,
      success: false
    };
  }
};

export default getCartByUserService