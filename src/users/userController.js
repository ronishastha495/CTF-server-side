const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./userModel");
const config = require("../config/config");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerUser = async (req, res, next) => {
  const { fullname, username, email, password, role } = req.body;
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
      role: role || "user",
    });

    res.status(200).json({
      message: "User registered sucessfully",
      newUser,
    });
  } catch (error) {
    next(createError(500, "Server Error while creating new user."));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, "All feilds are required!"));
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return next(createError(401, "Incorrect email and password !"));
    }
    const token = jwt.sign({ sub: user._id }, config.jwtSecret, {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "User Login Sucessfully",
      accessToken: token,
    });
  } catch (error) {
    return next(createError(500, "Server error while login."));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find({});
    res.json(user);
  } catch (error) {
    return next(createError(500, "Server error while fetching users."));
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return next(createError(404, "User not found."));
    }
    res.json(user);
  } catch (error) {
    return next(createError(500, "Server error while fetch user by ID."));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
};
