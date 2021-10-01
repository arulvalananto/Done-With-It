const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { addFeed, getAllFeed } = require("../controllers/feed.controller");
const upload = require("../utils/fileUpload");

const route = express.Router();

route.use(isAuthenticated);

route.get("/retrieve-all", getAllFeed);

route.post("/add", upload.array("images", 6), addFeed);

module.exports = route;
