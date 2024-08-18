import { Router } from "express";
import { increment } from "../controllers/autoIncController";
const router = Router();

router.get('/', increment);

export default router;