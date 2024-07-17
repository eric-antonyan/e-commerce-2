import addToCartService from "../services/addToCart.service.js";

export default async (req, res) => {
  const { userId, productId } = req.body;
  const data = await addToCartService(userId, productId);
  res.status(data.statusCode).send(data.responseData)
};
