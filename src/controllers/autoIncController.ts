import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AutoInc from "../models/autoIncModel";

export const increment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let number: any = await AutoInc.findOne({});
    if (!number) {
        number = await AutoInc.create({ docNumber: 1 });
    } else {
        number.docNumber =  number.docNumber + 1;
        number.save();
    }
    return res.status(200).json(number)
})