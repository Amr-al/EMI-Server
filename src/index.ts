import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import cors from "cors";
import helmet from "helmet";
import xss from 'xss';
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import userRoutes from './routes/userRoutes'
import { conect } from "./utils/dataBaseConnection";
import morgan from 'morgan';
const App = express();
// parse incoming requests with JSON data
App.use(express.json());

conect();

//Allow cors for localhost
App.use(
  cors({
    origin: "*",
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

App.all("*", (req: any, res: any, next: any) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404))
});
App.use(globalErrorHandler);

App.listen(process.env.PORT,()=>{
    console.log(`app is running on PORT ${process.env.PORT}`);
})
