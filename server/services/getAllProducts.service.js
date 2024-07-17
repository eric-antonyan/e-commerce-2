import productsModel from "../models/products.model.js"

export default async (res) => {
    const products = await productsModel.find({})
    if (!products) {
        return res.status(400).send({ message: "Invalid Data", success: false })
    }
    return res.status(200).send({message: "Products successfully getted!", success: true, productsCount: products.length, products})
}