const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./userModel");
const config  = require("../config/config");

const registerUser = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;
  if (!fullname || !username || !email || !password) {
    const error = createError(400, "All fields are required.");
    return next(error);
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createError(400, "User already exists with this email!");
      return next(error);
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      fullname,
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret, {
      expiresIn: "7d",
    });
    res.status(201).json({ accessToken: token });
  } catch (error) {
    next(createError(500, "Server Error while creating new user."));
  }
};

module.exports = {
  registerUser,
};
