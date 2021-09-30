const express = require("express");

const {
  login,
  register,
  forgotPassword,
  getCurrentUser,
  changePassword,
} = require("../controllers/auth.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const route = express.Router();

route.post("/login", login);
route.post("/register", register);
route.post("/forgot-password", forgotPassword);

route.use(isAuthenticated);
route.get("/current-user", getCurrentUser);
route.put("/change-password", changePassword);

module.exports = route;
