import { Router } from "express";
import generateStep from "../controllers/generateStep.js";
const router = Router()
router.post('/',generateStep)

export default router;