const express = require("express");
const checkUserRole = require("../middlewares/rbacMiddleware");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} = require("./userController");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", checkUserRole("admin"), getAllUsers);
userRouter.get("/:id", checkUserRole("user"), getUserById);

module.exports = userRouter;
