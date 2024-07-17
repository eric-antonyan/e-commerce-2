import editProductService from "../services/editProduct.service.js"

export default (req, res) => {
    const { id } = req.params

    if (id) {
        editProductService(req, res)
    } else {
        res.send({ message: "Invalid request", success: false, statusCode: 400 })
    }
}