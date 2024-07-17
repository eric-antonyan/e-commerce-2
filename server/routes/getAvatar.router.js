import { Router } from "express";
import getAvatarController from "../controllers/getAvatar.controller.js";
const router = Router()

router.get("/:_id", getAvatarController)

export default router