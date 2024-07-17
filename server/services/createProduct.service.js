import productsModel from "../models/products.model.js"

export default async (title, price, description, file, _id, res) => {
    if (!title, !price, !file) {
        return res.status(400).send({ message: "Please fill all fields" })
    } else {
        const product = new productsModel({
            title,
            price,
            description,
            image: file.filename,
            creator: _id
        })

        await product.save()

        return res.send({ message: "Product is created", success: true, statusCode: 200 })
    }
}