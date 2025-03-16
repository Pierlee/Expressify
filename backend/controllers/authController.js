const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
// const sendToken = require("../utils/jwtToken");

// 🔹 Register a User → /api/v1/auth/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/default",
      url: "https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/default.png"
    }
  });

  const token = user.getJWTToken();


  res.status(201).json({
    success: true,
    token
  });
});

// 🔹 Login User → /api/v1/auth/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

    // checks if email and password are entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  // Finding user in database
  const user = await User.findOne({ email }).select("+password");
  
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = user.getJwtToken()

  res.status(200).json({
    success: true,
    token
  });
});

// 🔹 Get User Profile → /api/v1/auth/me
// exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   res.status(200).json({
//     success: true,
//     user
//   });
// });
