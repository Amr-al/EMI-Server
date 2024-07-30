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
        enum: ["admin", "montadaben", "info", "planing", "retired", "affairs"],
        required: true
    },
    password: {
        type: String,
        required: [true, "من فضلك ادخل الرقم السري"],
        maxLength: 30,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "من فضلك أكد الرقم السري"],
        validate: {
            validator: function (el) {
                return el == this.password;
            },
            message: "الرقم السري غير متطابق",
        },
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userModel);
exports.default = User;
