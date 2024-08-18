import express, { NextFunction, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import cors from "cors";
import helmet from "helmet";
import xss from 'xss';
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import userRoutes from './routes/userRoutes';
import autoRoutes from './routes/autoIncRoutes'
import documentRoutes from './routes/documentsRoutes';
import { conect } from "./utils/dataBaseConnection";
import morgan from 'morgan';
const App = express();

// parse incoming requests with JSON data
App.use(express.json());

// connecting to dataBase
conect();

//Allow cors for Frontend
App.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }) as any
);

// initializing morgan for using it locally
App.use(morgan('dev'));

//Set security http headers
App.use(helmet());

//Data sanitization against xss attacks
xss('<script>alert("xss");</script>');

// global routes
App.use('/auth', userRoutes);
App.use('/document', documentRoutes)
App.use('/inc', autoRoutes)

// middelware for handling non existed routes
App.all("*", (req: any, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
});

// middelware for handling returned errors
App.use(globalErrorHandler);

App.listen(process.env.PORT, async () => {
  console.log(`app is running on PORT ${process.env.PORT}`);
})