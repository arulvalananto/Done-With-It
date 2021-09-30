const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const sendMail = require("../utils/sendMail");

const _signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

exports.register = catchAsync(async (req, res) => {
  const { fullName, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ fullName, email, password: hashPassword });

  const token = _signToken(user._id);

  res.status(201).json({ message: "User created", token });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Invalid email and/or password", 401));
  }

  const token = _signToken(user._id);

  res.status(200).json({ message: "Logged in", token });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError("No user found!", 404));
  }

  res.status(200).json({ message: "User retrieved", user });
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

  const hashPassword = await bcrypt.hash(newPassword, 12);

  const user = await User.findById(req.user.id).select("+password");
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("No user found and/or Invalid Password", 404));
  }

  user.password = hashPassword;
  await user.save();

  res.status(200).json({ message: "Password changed" });
});
