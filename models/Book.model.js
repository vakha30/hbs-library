const { Schema, model } = require("mongoose");

const bookSchema = Schema({
  name: String,
  description: String,
  image: {
    type: String,
    default:
      "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",
  },
  isArend: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Book = model("Book", bookSchema);
module.exports = Book;
