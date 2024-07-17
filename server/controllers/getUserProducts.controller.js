import editProductService from "../services/editProduct.service.js"
import getAllProductsService from "../services/getAllProducts.service.js"
import getUserProductsService from "../services/getUserProducts.service.js"

export default (req, res) => {
    const { get, edit } = req.query

    if (get) {
        getUserProductsService(get, res)
    } else {
        getAllProductsService(res)
    }
}