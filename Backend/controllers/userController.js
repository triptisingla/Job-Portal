import ErrorHandler from '../middlewares/errors.js';
import { User } from '../models/userSchema.js';
import { catchAsyncError } from './../middlewares/catchAsyncError.js';
import { sendToken } from '../utils/jwtToken.js'


export const register = catchAsyncError(async (req, res, next) => {
    console.log("in route");
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("Please fill full registration form"))
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already exists!!"));

    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
    });
    // const user1 =await User.find({ email: email });
    // console.log(user1);
    sendToken(user, 200, res, "User Registered Successfully!");
    // return res.status(200).json({
    //     success: true,
    //     message: "User registered!",
    //     user,
    // });

});


export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide email,password and role.", 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invlid Email or Password", 400));
    }
    if (user.role !== role) {
        return next(new ErrorHandler("User with this role not found.", 400));
    }
    sendToken(user, 200, res, "User logged in siccessfully!");

})


export const logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logged out successfully!"
    })
})

export const getUser = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
})