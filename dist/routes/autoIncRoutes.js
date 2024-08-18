"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autoIncController_1 = require("../controllers/autoIncController");
const router = (0, express_1.Router)();
router.get('/', autoIncController_1.increment);
exports.default = router;
