import userModel from "../models/users.model.js";
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";
import dotenv from "dotenv"
dotenv.config()

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, "..", "secret"));

export const { SECRET_KEY } = process.env;

export const createUserService = async (firstName, lastName, email, password, swiftBank, company, file, res) => {
    const isExist = await userModel.findOne({ email })

    const avatar = file ? file.filename : null

    if (!firstName || !email || !password || !swiftBank || !company) {
        return res.status(200).send('All fields are required');
    } else {
        if (!isExist) {
            const walletResponse = await fetch("http://localhost:6006/account" + swiftBank, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const wallet = await walletResponse.json()
            console.log(wallet);
            if (wallet.success != "404") {
                const newUser = await userModel.create({ firstName, lastName, email, password, swiftBank, company, avatar })
                jwt.sign({userId: newUser._id}, SECRET_KEY, { algorithm: "HS256" }, (err, token) => {
                    if (err) console.log(err);
                    res.send({ message: "Account successfully created!", success: true, token })
                })
            } else {
                res.send({ message: "This wallet is not found", success: false })
            }
        } else {
            res.send({ message: "This email is exist", success: false })
        }
    }
}