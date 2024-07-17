import mongoose from "mongoose";
import app from "./app.js"
import dotenv from "dotenv"

dotenv.config()

const { PORT, MONGO_DB } = process.env;

(async () => {
    if (PORT && MONGO_DB) {
        await mongoose.connect(MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected successfully!")
        app.listen(PORT, () => {
            console.log("Server initilazed!")
        })
    } else {
        console.log("Please set PORT and MONGO_DB or check you environment variables")
    }
})()