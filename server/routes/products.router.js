import { Router } from "express";
import { createProduct, uploadProduct } from "../controllers/createProduct.controller.js";
import getUserProductsController from "../controllers/getUserProducts.controller.js";
import editProductController from "../controllers/editProduct.controller.js";
import deleteProductController from "../controllers/deleteProduct.controller.js";
import getProductController from "../controllers/getProduct.controller.js";
const router = Router()

router.post("/", uploadProduct.single("file"), createProduct)
router.get("/", getUserProductsController);
router.get("/:id", getProductController);
router.put("/:id", editProductController)
router.delete("/:id", deleteProductController)

export default router