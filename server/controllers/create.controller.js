import multer from "multer"
import path from "path"
import userModel from "../models/users.model.js"
import { fileURLToPath } from "url";
import { log } from "console";
import { createUserService } from "../services/createUser.service.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public", "__next", "__avatar__"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const upload = multer({ storage })

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password, swiftBank, company } = req.body
    const file = req.file

    createUserService(firstName, lastName, email, password, swiftBank, company, file, res)
}