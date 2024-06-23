const express = require("express");
const { registerUser } = require("./userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

module.exports = userRouter;