import getUserService from "../services/getUser.service.js"
import CryptoJS from "crypto-js"

export default (req, res) => {
    const { hashCode } = req.body

    const { SECRET_KEY } = process.env

    const bytes = CryptoJS.AES.decrypt(hashCode, SECRET_KEY);
    const _id = bytes.toString(CryptoJS.enc.Utf8);

    console.log(_id);
    
    if (!_id) {
        res.send({ message: "Invalid Token", success: false, statusCode: 404 })
    }

    getUserService(_id, res, SECRET_KEY, CryptoJS)
}