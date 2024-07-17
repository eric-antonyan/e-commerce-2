import { Router } from "express"
import addToCartFavoritesController from "../controllers/addToFavorites.controller.js"
import isAddedToFavoritesController from "../controllers/isAddedToFavorites.controller.js"
import getFavoritesByUserController from "../controllers/getFavoritesByUser.controller.js"
const router = Router()

router.post("/add", addToCartFavoritesController)
router.post("/check", isAddedToFavoritesController)
router.get("/:userId", getFavoritesByUserController)

export default router