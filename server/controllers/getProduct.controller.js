import getProductService from "../services/getProduct.service.js"

export default (req, res) => {
    const { id } = req.params
    getProductService(id, res)
}