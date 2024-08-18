"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        maxLength: 50,
        minLength: 3,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "chief", "montChief", "infoCheif", "planChief", "montadaben", "info", "planing", "retired", "affairs", "sec"],
        required: true
    },
    password: {
        type: String,
        required: [true, "من فضلك ادخل الرقم السري"],
        maxLength: 200,
        select: false,
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userModel);
exports.default = User;
