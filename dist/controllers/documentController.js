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
exports.filterDocument = exports.getSuperAdminDocs = exports.getById = exports.uploadDocument = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const documentModel_1 = __importDefault(require("../models/documentModel"));
const autoIncModel_1 = __importDefault(require("../models/autoIncModel"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.uploadDocument = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extracting the files from request and initializing the array path for saving the pathes 
    let images = [], files = req.files;
    const { from, faxNo, object, type } = req.body;
    // checking if there are files in the request 
    if (!files || (files === null || files === void 0 ? void 0 : files.length) == 0)
        return next(new appError_1.default('من فضلك اضف الفاكس', 400));
    for (let i = 0; i < (files === null || files === void 0 ? void 0 : files.length); ++i)
        images.push(files[i].filename);
    // getting the docNumber then increment it
    const autoInc = yield autoIncModel_1.default.findOne({});
    let uniqueID = autoInc === null || autoInc === void 0 ? void 0 : autoInc.docNumber;
    autoInc.docNumber = (autoInc === null || autoInc === void 0 ? void 0 : autoInc.docNumber) + 1;
    autoInc.save();
    const document = yield documentModel_1.default.create({ images, from, faxNo, uniqueID, object, type });
    return res.status(200).json(document);
}));
exports.getById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // checking if the id is valid
    if (!id || !mongoose_1.default.isValidObjectId(id)) {
        return next(new appError_1.default('Enter a valid ID', 400));
    }
    // getting the document and return it 
    const doc = yield documentModel_1.default.findById(id);
    return res.status(200).json(doc);
}));
exports.getSuperAdminDocs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find documents not seen by chief
    const documents = yield documentModel_1.default.find({ chief: false });
    return res.status(200).json(documents);
}));
exports.filterDocument = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract fax Number from request params
    const { faxNo } = req.params;
    const document = yield documentModel_1.default.findOne({ uniqueID: faxNo });
    return res.status(200).json(document);
}));
