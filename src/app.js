require("dotenv").config();
const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const userRouter = require("./users/userRouter");

const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res, next) => {
  res.json({ msg: "Welcome to CTF Nepal." });
});


module.exports = app;
