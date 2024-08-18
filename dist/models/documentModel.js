"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const documentModel = new mongoose_1.default.Schema({
    images: [String],
    chief: { type: Boolean, default: false },
    info: { type: Boolean, default: false },
    planning: { type: Boolean, default: false },
    montadaben: { type: Boolean, default: false },
    sections: String,
    note: String,
    secondNote: String,
    faxNo: { type: String, maxLength: 50 },
    uniqueID: Number,
    receiver: String,
    from: String,
    object: String,
    type: { type: String, enum: ['income', 'outcome'] },
    reviewed: { type: Boolean, default: false },
}, {
    timestamps: true
});
const Document = mongoose_1.default.model('Document', documentModel);
exports.default = Document;
