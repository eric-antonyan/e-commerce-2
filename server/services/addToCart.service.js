import mongoose from "mongoose";
import cartModel from "../models/cart.model.js";

const addToCartService = async (userId, productId) => {
  const isInvalidMongooseId = (value) =>
    !mongoose.Types.ObjectId.isValid(value);
  if (isInvalidMongooseId(userId) || isInvalidMongooseId(productId)) {
    const errorMessage = (userId, productId) => {
      if (userId && productId) {
        return true;
      } else if (userId && !productId) {
        return "Please add productId in your request body";
      } else {
        return "Please add userId in your request body";
      }
    };

    return {
      responseData: {
        message: "invalid Data",
        error: errorMessage(userId, productId)
          ? {
              data: { userId, productId },
              message: errorMessage(userId, productId),
            }
          : null,
        success: false,
      },
      statusCode: 400,
    };
  } else {
    const cartIsExist = await cartModel.findOne({ userId, productId });

    console.log(cartIsExist);

    if (cartIsExist) {
      const count = cartIsExist.count + 1;
      console.log(count);
      const updateCount = await cartModel.findOneAndUpdate(
        {
          _id: cartIsExist._id,
        },
        {
          count,
        }
      );

      return {
        responseData: {
          message: "Count added +1",
          success: true,
          count
        },
        statusCode: 200,
      };
    } else {
      const added = await !!cartModel.create({ userId, productId });
      return {
        responseData: {
          message: added ? "Added" : "Removed",
          added,
          success: added,
        },
        statusCode: added ? 200 : 400,
      };
    }
  }
};

export default addToCartService;
