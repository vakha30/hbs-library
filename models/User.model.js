const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: String,
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
