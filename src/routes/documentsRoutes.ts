import { filterDocument, getById, getBossesDocs, uploadDocument, updateDoc } from "../controllers/documentController";
import upload from "../utils/multer";
import { Router } from "express";
import { isLogin, isChief } from "../utils/protectedRoutes";

const router = Router();

router.post('/upload', isLogin, upload.array('files', 8), uploadDocument);
router.get('/chief', isLogin, getBossesDocs);
router.get('/:id', isLogin, getById);
router.patch('/:id', isLogin, updateDoc)
router.get('/filter/:faxNo', filterDocument);
export default router;