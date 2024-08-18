import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { correctPassword, generateToken, hashPassword } from "../utils/helpers";
import mongoose from "mongoose";

export const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;
    // validate the input data
    if (!name) return next(new AppError("من فضلك ادخل الرقم السري", 400));
    if (!password) {
      return next(new AppError("من فضلك ادخل الرقم السري", 400));
    }
    // getting user data except user's password
    const user:any = await User.findOne({ name }).select("+password");
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
    console.log(user)
    // returing the token if the data is correct
    const token = generateToken({
      id: user._id,
      name: user.name,
      role: user.role,
      image: user.image
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
    let image = req.file?.filename;
    // checking if username is exist
    let check = await User.findOne({ name });
    if (check) {
      return next(new AppError("اسم المستخدم موجود بالفعل", 400));
    }
    if (password != confirmPassword) {
      return next(new AppError("الرقم السري غير متطابق", 400))
    }
    // encrpyt user's password
    let hashedPassword = await hashPassword(password);
    const user = await User.create({ name, image, password: hashedPassword, role });

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

export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find({});
  res.status(200).json(users)
})

export const getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id || !mongoose.isValidObjectId(id)) {
    return next(new AppError('Invalid User', 400));
  }
  const user = await User.findById(id);
  res.status(200).json(user);
})

export const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { password, confirmPassword, name, role, id } = req.body;
  return res.status(200).json(req.body);
})