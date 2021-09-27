const express = require("express");

const {
  login,
  register,
  forgotPassword,
} = require("../controllers/auth.controller");

const route = express.Router();

route.post("/login", login);
route.post("/register", register);
route.post("/forgot-password", forgotPassword);

module.exports = route;
