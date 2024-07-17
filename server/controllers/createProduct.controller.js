import multer from "multer"
import path from "path"
import { fileURLToPath } from "url";
import { createUserService } from "../services/createUser.service.js";
import createProductService from "../services/createProduct.service.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public", "__next", "__thumbnail__"))
    },
    filename: (req, file, cb) => {
        cb(null, `product-${Date.now()}-${file.originalname}`)
    }
})

export const uploadProduct = multer({ storage })

export const createProduct = (req, res) => {
    const file = req.file;

    const { price, title, description, _id } = req.body

    createProductService(title, price, description, file, _id, res)
}