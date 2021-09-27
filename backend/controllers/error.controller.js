module.exports = (err, req, res, next) => {
  err.status = err.status || "fail";
  err.statusCode = err.statusCode || 500;

  let stack = err.stack;

  if (process.env.NODE_ENV === "production") {
    stack = undefined;
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack,
  });
};
