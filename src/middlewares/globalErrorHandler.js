const { HttpError } = require("http-errors");
const config = require("../config/config");

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err instanceof HttpError ? err.status : 500;

  res.status(statusCode).json({
    message: err.message,
    errorStack: config.env === "development" ? err.stack : "",
  });
};

module.exports = globalErrorHandler;
