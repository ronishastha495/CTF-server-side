const express = require("express");
const { isAdmin, isUser, verifyUserId, authenticateToken } = require("../middlewares/authHandle");


const {
  registerUser,
  loginUser,
  handleLogout,
  getAllUsers,
  getUserById,
  refreshAccessToken,
} = require("./userController");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", handleLogout);
userRouter.get("/getAllUsers", authenticateToken, isAdmin, getAllUsers);
userRouter.get("/:id", authenticateToken, isUser, getUserById);
userRouter.post("/refresh", refreshAccessToken);

module.exports = userRouter;
