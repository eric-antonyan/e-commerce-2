import { Router } from "express";
import getAvatarRouter from "../routes/getAvatar.router.js";
const router = Router()

router.use("/__avatar__", getAvatarRouter)
// router.use("/__thumbnail__", thumbnailRouter)

export default router