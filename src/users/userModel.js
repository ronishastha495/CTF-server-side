const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userModelSchema);

module.exports = UserModel;
