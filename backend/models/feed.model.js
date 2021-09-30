const mongoose = require("mongoose");

const feedSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Feed should have a name"],
    },
    images: [String],
    category: {
      type: String,
      enum: {
        values: [
          "Furniture",
          "Cars",
          "Cameras",
          "Games",
          "Clothing",
          "Sports",
          "Movies & Music",
          "Books",
          "Digital Rights",
          "Other",
        ],
        message: "{VALUES} is not supported",
      },
    },
    price: { type: Number },
    location: { latitude: { type: String }, longitude: { type: String } },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  {
    toObject: { virutals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

module.exports = mongoose.model("Feeds", feedSchema);
