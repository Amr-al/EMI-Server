import upload from "../utils/multer";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.post('/', upload.array('files',12), (req:Request, res:Response, next:NextFunction)=>{
    console.log(req.files);
})

export default router;