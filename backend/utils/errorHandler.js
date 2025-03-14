// Error Handler Class
class ErrorHandler extends Error {
  constructor(message, errorCode, statusCode){
    super(message)
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ErrorHandler