const { HttpError } = require("http-errors");
const config = require("../config/config");

const createErrorResponse = (statusCode, errorMessage, errorStack) => {
  return {
    StatusCode: statusCode,
    IsSuccess: false,
    ErrorMessage: [
      {
        message: errorMessage,
        errorStack: errorStack,
      },
    ],
    Result: null,
  };
};

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err instanceof HttpError ? err.status : 500;
  const errorMessage = err.message;
  const errorStack = config.env === "development" ? err.stack : "";

  res
    .status(statusCode)
    .json(createErrorResponse(statusCode, errorMessage, errorStack));
};

module.exports = globalErrorHandler;
