import { Router } from "express";
import getUserRouter from "./getUser.router.js"
const router = Router()

router.use("/u", getUserRouter)

export default router