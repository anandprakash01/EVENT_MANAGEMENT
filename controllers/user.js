const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");
const logger = require("../utils/logger.js");

const validateRegistratinData = require("../validations/register.js");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const registerUser = async (req, res) => {
  const err = validateRegistratinData(req.body);

  if (err.hasError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const userDetail = {
    name: req.body.name,
    email: req.body.email,
  };

  const alreadyRegistered = await User.findOne({email: req.body.email});
  // console.log(alreadyRegistered);
  if (alreadyRegistered) {
    return res.json({
      success: false,
      message: "User is already Registered, Please login",
    });
  }

  const plainTextPass = req.body.password;

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(plainTextPass, salt);

  userDetail.password = hashPass;

  const user = new User(userDetail);
  await user.save();

  res.json({
    successs: true,
    message: "registered successfully",
  });
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const plainTextPass = req.body.password;

  //validation

  const user = await User.findOne({email: email});
  //   console.log(user);

  if (!user) {
    // loging after if user is not registered
    logger.info("LOGIN_FAILURE", {
      timestamp: new Date(),
      reason: "USER_NOT_REGISTERED with id " + email,
      email: email,
    });

    return res.status(400).json({
      success: false,
      message: "User not registered",
    });
  }

  const hashPassword = user.password;
  const isPasswordValid = await bcrypt.compare(plainTextPass, hashPassword);

  if (!isPasswordValid) {
    // loging after INCORRECT Credentials
    logger.info("LOGIN_FAILURE", {
      timestamp: new Date(),
      reason: "Wrong Password for " + email,
      email: email,
    });

    return res.status(400).json({
      success: false,
      message: "Incorrect username or password",
    });
  }

  // loging after the successful login
  logger.info("LOGIN_SUCCESSFUL", {
    timestamp: new Date(),
    email: user.email,
  });

  const tokenPayload = {
    exp: Math.floor(Date.now() / 1000 + 3600),
    email: user.email,
    _id: user._id,
  };

  const token = jwt.sign(tokenPayload, jwtSecretKey);
  //   console.log(token);

  await User.findByIdAndUpdate(user._id, {token: token});

  res.json({
    success: true,
    token: token,
  });
};

const logoutUser = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
    });
  }

  const decodedToken = jwt.decode(req.headers.authorization);
  const user = await User.findByIdAndUpdate(decodedToken._id, {token: ""});
  //   console.log(user);

  logger.info("LOGOUT_SUCCESSFUL", {
    timestamp: new Date(),
    reason: "Logout successful for " + decodedToken.email,
  });

  return res.json({
    success: true,
    message: "logged Out Successful",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
