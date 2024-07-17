import { Router } from "express";
import addToCartController from "../controllers/addToCart.controller.js";
import getCartByUserController from "../controllers/getCartByUser.controller.js";
const router = Router()

router.post("/", addToCartController)
router.get("/:userId", getCartByUserController)

export default router;