import express from "express"
import apiRouter from "./routes/api.router.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/api", apiRouter)

export default app