const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  if (!req.headers || !req.headers["x-access-token"])
    return next(new AppError("unauthorized", 401));
  const token = req.headers["x-access-token"];

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded) return next(new AppError("Invalid token", 401));

  req.user = decoded;
  next();
});
