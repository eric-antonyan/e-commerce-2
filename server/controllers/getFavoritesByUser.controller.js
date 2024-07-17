import mongoose from "mongoose"
import getFavoritesByUserService from "../services/getFavoritesByUser.service.js"

export default (req, res) => {
    const { userId } = req.params

    console.log(userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.send({ message: "Invalid id", success: false, statusCode: 404 })
    }

    getFavoritesByUserService(userId, res)
}