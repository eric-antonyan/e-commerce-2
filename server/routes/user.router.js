import { Router } from "express";
import { upload, createUser } from "../controllers/create.controller.js"
import usersModel from "../models/users.model.js";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";

const router = Router()

router.post("/", upload.single("avatar"), createUser)
router.get("/", async (req, res) => {
    const { SECRET_KEY } = process.env
    const { get } = req.query
    if (get) {
        if (!mongoose.Types.ObjectId.isValid(get)) {
            return res.send({ message: "Invalid id", success: false, statusCode: 404 })
        }

        const user = await usersModel.findById(get)

        if (!user) {
            return res.send({ message: "User not found", identificator: get, success: false, statusCode: 404 })
        }

        const bytes = CryptoJS.AES.encrypt(JSON.stringify(user), SECRET_KEY)
        const id = bytes.toString()

        return res.send({ message: "User is found", success: true, statusCode: 200, id })
    } else {
        return res.send({ message: "Invalid request", success: false, statusCode: 400 })
    }
})


export default router