import getAvatarService from "../services/getAvatar.service.js"

export default (req, res) => {
    const { _id } = req.params
    getAvatarService(_id, res)
}