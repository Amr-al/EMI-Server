import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import Document from "../models/documentModel";
import AutoInc from "../models/autoIncModel";
import mongoose from "mongoose";

export const uploadDocument = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // extracting the files from request and initializing the array path for saving the pathes 
    let images = [], files: [object] | any = req.files;
    const { from, faxNo, object, type } = req.body;

    // checking if there are files in the request 
    if (!files || files?.length == 0) return next(new AppError('من فضلك اضف الفاكس', 400));
    for (let i = 0; i < files?.length; ++i) images.push(files[i].filename);

    // getting the docNumber then increment it
    const autoInc: any = await AutoInc.findOne({});
    let uniqueID = autoInc?.docNumber;
    autoInc.docNumber = autoInc?.docNumber + 1;
    autoInc.save();

    const document = await Document.create({ images, from, faxNo, uniqueID, object, type });
    return res.status(200).json(document);
})

export const getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    // checking if the id is valid
    if (!id || !mongoose.isValidObjectId(id)) {
        return next(new AppError('Enter a valid ID', 400));
    }
    // getting the document and return it 
    const doc = await Document.findById(id);
    return res.status(200).json(doc);
})

export const updateDoc = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(id);
    if (!id || !mongoose.isValidObjectId(id)) {
        return next(new AppError('not a valid Id', 400));
    }
    console.log(req.body);

    let doc = await Document.findByIdAndUpdate(id, req.body, { new: true });
    if (!doc) {
        return next(new AppError('document is not exist', 404));
    }
    return res.status(200).json(doc);
})

export const getBossesDocs = catchAsync(async (req: any, res: Response) => {
    let documents = null;
    console.log(req.user.role, req.headers['role'])
    if (req.user?.role === 'chief' || (req.user?.role === 'admin' && req.headers['role'] === 'chief')) {
        // finding documents not seen by chief
        documents = await Document.find({ chief: false });
    } else if (req.user?.role === 'montChief' || (req.user?.role === 'admin' && req.headers['role'] === 'montChief')) {
        // finding documents not seen by chief of montadaben 
        documents = await Document.find({ montChief: false })
    } else if (req.user?.role == 'infoChief' || (req.user?.role === 'admin' && req.headers['role'] === 'infoChief')) {
        // finding documents not seen by chief of information
        documents = await Document.find({ infoChief: false })
    } else if (req.user?.role == 'planChief' || (req.user?.role === 'admin' && req.headers['role'] === 'planChief')) {
        // finding documents not seen by chief of planing
        documents = await Document.find({ planChief: false })
    }
    return res.status(200).json(documents);
});

export const filterDocument = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // extract fax Number from request params
    const { faxNo } = req.params;
    const document = await Document.findOne({ uniqueID: faxNo });
    return res.status(200).json(document);
})