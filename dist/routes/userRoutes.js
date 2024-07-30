"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/signin', authController_1.signIn);
router.post('/signup', authController_1.signUp);
exports.default = router;
