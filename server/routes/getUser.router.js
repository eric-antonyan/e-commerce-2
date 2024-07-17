import getUserController from "../controllers/getUser.controller.js";
import { Router } from "express";
const router = Router()


router.post("/", getUserController)

export default router