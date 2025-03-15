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


  res.status(201).json({
    success: true,
    user
  });
});

// 🔹 Login User → /api/v1/auth/login
// exports.loginUser = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorHandler("Please enter email and password", 400));
//   }

//   const user = await User.findOne({ email }).select("+password");

//   if (!user || !(await user.comparePassword(password))) {
//     return next(new ErrorHandler("Invalid email or password", 401));
//   }

//   sendToken(user, 200, res);
// });

// 🔹 Get User Profile → /api/v1/auth/me
// exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   res.status(200).json({
//     success: true,
//     user
//   });
// });
