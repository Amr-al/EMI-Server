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
exports.isChief = exports.isAdmin = exports.isLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("./catchAsync"));
const appError_1 = __importDefault(require("./appError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.isLogin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract token from headers
    const token = req.headers['authorization'];
    // checking if the token is exist
    if (!token) {
        return next(new appError_1.default('Please, Login and try again', 400));
    }
    // verify if the token is valid
    let user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
    if (!user) {
        return next(new appError_1.default('Expired token!', 400));
    }
    // checking if the id is correct and exist
    const id = user.id;
    if (!id || !mongoose_1.default.isValidObjectId(id)) {
        return next(new appError_1.default('No such User exists', 404));
    }
    // getting user data and check if it is valid
    user = yield userModel_1.default.findById(id);
    if (!user) {
        return next(new appError_1.default('User does not exist', 400));
    }
    // passing the user data to the header
    req.user = user;
    // move to the next middelware
    next();
}));
exports.isAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract token from headers
    const token = req.headers['authorization'];
    // checking if the token is exist
    if (!token) {
        return next(new appError_1.default('Please, login and try again', 400));
    }
    // verify if the token is valid
    let user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
    if (!user) {
        return next(new appError_1.default('JWT Expire', 400));
    }
    // checking if the id is correct and exist
    let id = user.id;
    if (!id || !mongoose_1.default.isValidObjectId(id)) {
        return next(new appError_1.default('Not a valid user', 400));
    }
    user = yield userModel_1.default.findById(id);
    if (!user || user.role != 'admin') {
        return next(new appError_1.default('You do not have a permission', 404));
    }
    // passing user data to the header
    req.user = user;
    // move to the next middelware
    next();
}));
exports.isChief = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract token from headers
    const token = req.headers['authorization'];
    // checking if the token is exist
    if (!token) {
        return next(new appError_1.default('Please, Login and try again!', 400));
    }
    // verify if the token is valid
    let user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
    if (!user) {
        return next(new appError_1.default('JWT Expire!', 400));
    }
    // checking if the id is correct and exist
    let id = user.id;
    if (!id || !mongoose_1.default.isValidObjectId(id)) {
        return next(new appError_1.default('Not a Valid user', 400));
    }
    user = yield userModel_1.default.findById(id);
    if (!user || user.role != 'chief') {
        return next(new appError_1.default('You do not have a permission', 400));
    }
    // passing user data to the header
    req.user = user;
    // move to the next middelware
    next();
}));
