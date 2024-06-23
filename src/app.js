require("dotenv").config();
const express = require("express");
const createHttpError = require("http-errors");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const userRouter = require("./users/userRouter");

const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res, next) => {
  const error = createHttpError(400, "Something went wrong!");
  next(error);  
});


module.exports = app;
