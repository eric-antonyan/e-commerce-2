import { authUser } from "../services/auth.service.js"

export default (req, res) => {
    const { data } = req.body

    authUser(data, res)
}