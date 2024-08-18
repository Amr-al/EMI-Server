"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const auto = new mongoose_1.default.Schema({
    docNumber: Number
});
const AutoInc = mongoose_1.default.model('AutoInc', auto);
exports.default = AutoInc;
