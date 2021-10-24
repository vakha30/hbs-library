const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: String,
  avatar: {
    type: String,
    default: "https://www.meme-arsenal.com/memes/36b78c8b7cd957e082f53148b74787ea.jpg",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  arendBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("User", userSchema);
module.exports = User;
