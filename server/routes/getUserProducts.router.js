import { Router } from "express";
import getUserProductsController from "../controllers/getUserProducts.controller.js";
const router = Router()

router.get("/", getUserProductsController)

export default router