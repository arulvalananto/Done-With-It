const Feed = require("../models/feed.model");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllFeed = catchAsync(async (req, res, next) => {
  const feeds = await Feed.find({})
    .sort({ createdAt: -1 })
    .populate("createdBy")
    .lean();

  console.log(feeds);

  res.status(200).json({ message: "Feeds retrieved", feeds });
});

exports.addFeed = catchAsync(async (req, res, next) => {
  if (req.files.length < 1) {
    return next(new AppError("feed must have at least one image"));
  }

  const { title, price, category, description, location } = req.body;
  const images = req.files.map((image) => image.filename);

  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError("unauthorized", 401));
  }

  const feed = await Feed.create({
    title,
    price,
    category,
    description,
    images,
    location,
    createdBy: req.user.id,
  });

  user.feeds.push(feed._id);
  await user.save();

  console.log(feed);

  res.status(201).json({ message: "Feed created", feed });
});
