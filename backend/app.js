const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const feedRoutes = require("./routes/feed.routes");
const errorController = require("./controllers/error.controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(compression());
app.use(helmet());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/feed", feedRoutes);

app.use(errorController);

module.exports = app;
