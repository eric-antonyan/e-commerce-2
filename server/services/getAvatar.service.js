import mongoose from "mongoose";
import usersModel from "../models/users.model.js";
import path from "path";
import fs from "fs";
import { __dirname } from "./createUser.service.js";

export default async (_id, res) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        console.log(_id);
        return res.send({ message: "Invalid id", success: false, statusCode: 404 })
    } else {
        const user = await usersModel.findById(_id);

        console.log(user);

        if (!user || !user.avatar) {
            res.send({ message: "User avatar not found", success: false, statusCode: 404 });
        } else {
            const avatarPath = path.join(__dirname, "..", "public", "__next", "__avatar__", user.avatar);
            
            if (fs.existsSync(avatarPath)) {
                res.sendFile(avatarPath);
            } else {
                res.send({ message: "User avatar not found", success: false, statusCode: 404 });
            }
        }
    }
}
