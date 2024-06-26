const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./userModel");
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");
const config = require("../config/config");
const UserModel = require("./userModel");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
      data: newUser,
    });
  } catch (error) {
    next(createError(500, "Server Error while creating new user."));
  }
};

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
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

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      options,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      options,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    user.refreshToken = refreshToken;
    try {
      await user.save();
    } catch (error) {
      console.log("Error saving user: ", error);
    }

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    res.status(200).json({
      message: "User Login Sucessfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: userObj,
    });
  } catch (error) {
    return next(createError(500, "Server error while login."));
  }
};

const refreshAccessToken = async (req, res, next) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
    console.log('Incoming',incomingRefreshToken)

  if (!incomingRefreshToken) {
    return next(createError(401, "Unauthorized request: No token provided"));
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(incomingRefreshToken, config.refreshTokenSecret);
  } catch (error) {
    return next(createError(401, "Invalid refresh token"));
  }

  const user = await userModel.findById(decodedToken.sub);
  if (!user) {
    return next(createError(401, "Invalid refresh token"));
  }

  if (incomingRefreshToken !== user.refreshToken) {
    return next(createError(401, "Refresh token is expired or used"));
  }

  const accessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);
  user.refreshToken = newRefreshToken;

  try {
    const newUser = await user.save();
    console.log("Which ?", newUser);
  } catch (error) {
    return next(createError(500, "Server error while saving user."));
  }

  res.cookie("accessToken", accessToken, {
    options,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", newRefreshToken, {
    options,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Access token refreshed successfully",
  });
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
  refreshAccessToken,
};
