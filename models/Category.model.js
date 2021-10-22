const { Schema, model } = require("mongoose");

const categorySchema = Schema({
  name: String,
});

const Category = model("Category", categorySchema);
module.exports = Category;
