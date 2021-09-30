const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { addFeed } = require("../controllers/feed.controller");
const upload = require("../utils/fileUpload");

const route = express.Router();

route.use(isAuthenticated);

route.post("/add", upload.array("images", 6), addFeed);

module.exports = route;
