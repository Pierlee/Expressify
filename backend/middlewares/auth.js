const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// Checks if user is authenticated
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Get token from cookies (if exists)
  const { token } = req.cookies
  // If no token, return error message and stop the function
  if (!token) {
    return next(new ErrorHandler('Not authorized, please login!', 401));
  }
  // verifies the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // If token is valid, assign user to req.user
  req.user = await User.findById(decoded.id);

  next()
});