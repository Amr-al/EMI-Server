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
exports.increment = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const autoIncModel_1 = __importDefault(require("../models/autoIncModel"));
exports.increment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let number = yield autoIncModel_1.default.findOne({});
    if (!number) {
        number = yield autoIncModel_1.default.create({ docNumber: 1 });
    }
    else {
        number.docNumber = number.docNumber + 1;
        number.save();
    }
    return res.status(200).json(number);
}));
