import { Router } from "express"
import resultsController from "../controllers/results.controller.js"
const router = Router()

router.get('/', resultsController)

export default router