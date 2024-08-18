"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getById = exports.getAllUsers = exports.signUp = exports.signIn = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const helpers_1 = require("../utils/helpers");
const mongoose_1 = __importDefault(require("mongoose"));
exports.signIn = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    // validate the input data
    if (!name)
        return next(new appError_1.default("من فضلك ادخل الرقم السري", 400));
    if (!password) {
        return next(new appError_1.default("من فضلك ادخل الرقم السري", 400));
    }
    // getting user data except user's password
    const user = yield userModel_1.default.findOne({ name }).select("+password");
    if (!user) {
        return next(new appError_1.default("الرقم السري او الاسم غير صحيح", 400));
    }
    // check if the entered password is correct
    const correct = yield (0, helpers_1.correctPassword)(password, (user === null || user === void 0 ? void 0 : user.password) || "");
    if (!correct) {
        return next(new appError_1.default("الرقم السري او الاسم غير صحيح", 401));
    }
    // returing the token if the data is correct
    const token = (0, helpers_1.generateToken)({
        id: user._id,
        name: user.name,
        role: user.role,
    });
    res.status(200).json({
        status: "success",
        token,
    });
}));
exports.signUp = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, role, confirmPassword } = req.body;
    // checking if username is exist
    let check = yield userModel_1.default.findOne({ name });
    if (check) {
        return next(new appError_1.default("اسم المستخدم موجود بالفعل", 400));
    }
    if (password != confirmPassword) {
        return next(new appError_1.default("الرقم السري غير متطابق", 400));
    }
    // encrpyt user's password
    let hashedPassword = yield (0, helpers_1.hashPassword)(password);
    const user = yield userModel_1.default.create({ name, password: hashedPassword, role });
    // returing the token if the data is correct
    const token = (0, helpers_1.generateToken)({
        id: user._id,
        name: user.name,
        role: user.role,
    });
    res.status(200).json({
        status: "success",
        token,
    });
}));
exports.getAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find({});
    res.status(200).json(users);
}));
exports.getById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || !mongoose_1.default.isValidObjectId(id)) {
        return next(new appError_1.default('Invalid User', 400));
    }
    const user = yield userModel_1.default.findById(id);
    res.status(200).json(user);
}));
exports.updateProfile = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, confirmPassword, name, role, id } = req.body;
    return res.status(200).json(req.body);
}));
