import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    },
    creator: {
        required: true,
        type: String
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: "products",
    autoIndex: true,
    strict: true
})

export default mongoose.model("product", productSchema)