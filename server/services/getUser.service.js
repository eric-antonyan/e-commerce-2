import mongoose from "mongoose";
import usersModel from "../models/users.model.js";

export default async (_id, res, secret_key, CryptoJS) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.send({ message: "Invalid ID", success: false, statusCode: 400 });
    }

    try {
        const user = await usersModel.findById(_id);
        if (user) {
            const userId = CryptoJS.AES.encrypt(JSON.stringify(user), secret_key).toString()
            res.status(200).send({ message: "User found", jwt: userId, success: true, statusCode: 200 });
        } else {
            res.status(404).send({ message: "User not found", success: false, statusCode: 404 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred", error: error.message, success: false, statusCode: 500 });
    }
};
