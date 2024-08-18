"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const documentController_1 = require("../controllers/documentController");
const multer_1 = __importDefault(require("../utils/multer"));
const express_1 = require("express");
const protectedRoutes_1 = require("../utils/protectedRoutes");
const router = (0, express_1.Router)();
router.post('/upload', protectedRoutes_1.isLogin, multer_1.default.array('files', 8), documentController_1.uploadDocument);
router.get('/chief', protectedRoutes_1.isChief, documentController_1.getSuperAdminDocs);
router.get('/:id', documentController_1.getById);
router.get('/filter/:faxNo', documentController_1.filterDocument);
exports.default = router;
