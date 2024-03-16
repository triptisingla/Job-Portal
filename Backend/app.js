import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import { dbConnection } from "./database/dbConnection.js";
import ErrorHandler, { errorMiddleware } from "./middlewares/errors.js";
// import multer from 'multer';

const app = express();








dotenv.config({ path: './config/config.env' })
app.use(cors({
    origin: "https://jobber-jobs.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(cookieParser());//NO AUTHORIZATION IF NO COOKIE PARSER PRESENT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// const upload = multer({ dest: '/uploads/' })

app.get('/', (req, res) => { return res.send("hii") });
app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

dbConnection();



app.use(errorMiddleware);
export default app; 