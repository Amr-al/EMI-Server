import { Router } from "express";
import { getAllUsers, getById, signIn, signUp, updateProfile } from "../controllers/authController";
import { isAdmin, isLogin } from "../utils/protectedRoutes";
import upload from "../utils/multer";

const router = Router();

router.post('/signin', signIn);
router.post('/signup', isAdmin, upload.single('file'), signUp);
router.get('/getAll', isAdmin, getAllUsers);
router.patch('/update', updateProfile);
router.get('/:id', getById);

export default router;