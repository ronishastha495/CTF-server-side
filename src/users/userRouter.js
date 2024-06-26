const express = require("express");

const {
  isAdmin,
  isUser,
  verifyUserId,
  authenticateToken,
} = require("../middlewares/authHandle");

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  refreshAccessToken,
} = require("./userController");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", authenticateToken, isAdmin, getAllUsers);
userRouter.get("/:id", authenticateToken, verifyUserId, isUser, getUserById);
userRouter.post("/refresh-token", refreshAccessToken);

module.exports = userRouter;
