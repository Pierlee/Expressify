// Create and send token and save in the cookie
const sentToken = (user, statusCode, res) => {

  // create Jwt token
  const token = user.getJWTToken();
  
  // Set cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    message: 'User authenticated',
    token,
  });
}

module.exports = sendToken;