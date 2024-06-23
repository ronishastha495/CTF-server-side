const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./userModel");
const config = require("../config/config");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerUser = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;
  if (!fullname || !username || !email || !password) {
    const error = createError(400, "All fields are required.");
    return next(error);
  }

  if (!passwordRegex.test(password)) {
    const error = createError(400, "Password must be strong!");
    return next(error);
  }

  try {
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      const error = createError(400, "Username is already taken.");
      return next(error);
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      const error = createError(400, "Email is already registered.");
      return next(error);
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      fullname,
      username,
      email,
      password: hashedPassword,
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
