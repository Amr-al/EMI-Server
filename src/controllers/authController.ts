import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { correctPassword, generateToken, hashPassword } from "../utils/helpers";

export const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;
    // validate the input data
    if (!name) return next(new AppError("من فضلك ادخل الرقم السري", 400));
    if (!password) {
      return next(new AppError("من فضلك ادخل الرقم السري", 400));
    }

    const user = await User.findOne({ name }).select("+password");
    console.log(user);
    if (!user) {
      return next(new AppError("الرقم السري او الاسم غير صحيح", 400));
    }

    // check if the entered password is correct
    const correct: Boolean = await correctPassword(
      password,
      user?.password || ""
    );
    if (!correct) {
      return next(new AppError("الرقم السري او الاسم غير صحيح", 401));
    }

    // returing the token if the data is correct
    const token = generateToken({
      id: user._id,
      name: user.name,
      role: user.role,
    });

    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, role, confirmPassword } = req.body;
    let check = await User.findOne({ name });
    if (check) {
      return next(new AppError("اسم المستخدم موجود بالفعل", 400));
    }
    if(password != confirmPassword){
        return next(new AppError("الرقم السري غير متطابق" , 400))
    }
    let hashedPassword = await hashPassword(password);
    const user = await User.create({ name, password:hashedPassword, role });
    // returing the token if the data is correct
    const token = generateToken({
      id: user._id,
      name: user.name,
      role: user.role,
    });
    res.status(200).json({
      status: "success",
      token,
    });
  }
);
