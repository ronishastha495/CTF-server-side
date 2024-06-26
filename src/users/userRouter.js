const express = require("express");
const { isAdmin, isUser, verifyUserId, authenticateToken } = require("../middlewares/authHandle");


const {
  registerUser,
  loginUser,
  handleLogout,
  getAllUsers,
  getUserById,
} = require("./userController");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", handleLogout);
userRouter.get("/", authenticateToken, isAdmin, getAllUsers);
userRouter.get("/:id", authenticateToken, verifyUserId, isUser, getUserById);

module.exports = userRouter;
