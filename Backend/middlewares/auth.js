import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errors.js";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.headers;
    console.log(token);
    if (!token) {
        return next(new ErrorHandler("User not authorized", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


    req.user = await User.findById(decoded.id);

    next();
})