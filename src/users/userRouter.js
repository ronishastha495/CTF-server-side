const express = require("express");
const { registerUser, loginUser } = require("./userController");

const userRouter = express.Router();

// userRouter.get("/", getAllUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;