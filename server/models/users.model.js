import mongoose from "mongoose";

const userScheme = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    swiftBank: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String
    },
    verifed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userScheme);