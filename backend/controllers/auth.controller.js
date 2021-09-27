const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const sendMail = require("../utils/sendMail");

const _signToken = (user) => {
  const payload = { _id: user._id, name: user.name, email: user.email };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Invalid email and/or password", 401));
  }

  const token = _signToken(user);

  res.status(200).json({ message: "Logged in", token });
});

exports.register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ name, email, password: hashPassword });

  const token = _signToken(user);

  res.status(201).json({ message: "User created", token });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError(
        "Couldn't able to found this email address. Please check it."
      )
    );
  }

  const response = sendMail(
    user.email,
    "Change Password",
    `<h1>Hello World</h1>`
  );
  console.log(response);

  res.status(200).json({ message: "Reset link sent your email address" });
});

exports.resetPassword = catchAsync(async (req, res, next) => {});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword } = req.body;
});
