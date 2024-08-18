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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const xss_1 = __importDefault(require("xss"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const autoIncRoutes_1 = __importDefault(require("./routes/autoIncRoutes"));
const documentsRoutes_1 = __importDefault(require("./routes/documentsRoutes"));
const dataBaseConnection_1 = require("./utils/dataBaseConnection");
const morgan_1 = __importDefault(require("morgan"));
const App = (0, express_1.default)();
// parse incoming requests with JSON data
App.use(express_1.default.json());
// connecting to dataBase
(0, dataBaseConnection_1.conect)();
//Allow cors for Frontend
App.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
    credentials: true,
}));
// initializing morgan for using it locally
App.use((0, morgan_1.default)('dev'));
//Set security http headers
App.use((0, helmet_1.default)());
//Data sanitization against xss attacks
(0, xss_1.default)('<script>alert("xss");</script>');
// global routes
App.use('/auth', userRoutes_1.default);
App.use('/document', documentsRoutes_1.default);
App.use('/inc', autoIncRoutes_1.default);
// middelware for handling non existed routes
App.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server`, 404));
});
// middelware for handling returned errors
App.use(errorController_1.default);
App.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`app is running on PORT ${process.env.PORT}`);
}));
