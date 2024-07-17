import getCartByUserService from "../services/getCartByUser.service.js";

const getCartByUserController = async (req, res) => {
  const { userId } = req.params;

  const result = await getCartByUserService(userId)
  console.log(result);
  res.send(result)
};

export default getCartByUserController;
