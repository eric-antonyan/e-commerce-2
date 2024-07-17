import CryptoJS from "crypto-js"
import dotenv from "dotenv"
import usersModel from "../models/users.model.js"
import jwt from "jsonwebtoken"
dotenv.config()

export const authUser = async (data, res) => {
    const { SECRET_KEY } = process.env
    const decryptedData = CryptoJS.AES.decrypt(data, SECRET_KEY)


    const d = decryptedData.toString(CryptoJS.enc.Utf8)
    const j = JSON.parse(d)

    const { swiftBank, cliconPassword } = j

    const clicon = await usersModel.findOne({ swiftBank, password: cliconPassword })

    if (clicon) {
        jwt.sign({userId: clicon._id}, SECRET_KEY, { algorithm: "HS256" }, (err, token) => {
            if (err) console.log(err);
            res.send({ message: "You successfully Logged in", success: true, token })
        })
    } else {
        res.send({ message: "Account not found", success: false })
    }
}