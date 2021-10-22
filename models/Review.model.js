const { Schema, model } = require("mongoose");

const reviewSchema = Schema({
  text: String,
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Review = model("Review", reviewSchema);
module.exports = Review;
