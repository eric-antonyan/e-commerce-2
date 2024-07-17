import { Router } from "express";
import userRouter from "../routes/user.router.js"
import authRouter from "./auth.router.js";
import hashRouter from "./hash.router.js"
import nextRouter from "./__next.router.js"
import productsRouter from "./products.router.js"
import favoriteRouter from "./favorites.router.js"
import resultsRouter from "../routes/results.router.js";
import cartRouter from "../routes/cart.router.js";

const router = Router()

router.use("/user", userRouter)
router.use("/auth", authRouter)
router.use("/hash", hashRouter)
router.use("/__next", nextRouter)
router.use("/p", productsRouter)
router.use("/favorite", favoriteRouter)
router.use("/results", resultsRouter)
router.use("/cart", cartRouter)

export default router