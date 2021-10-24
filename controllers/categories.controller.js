const Category = require("../models/Category.model");

module.exports.categoriesController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find().lean();
      categories.forEach((item) => (item.userId = req.params.userId));
      return res.render("category-page", { categories, userId: req.params.userId });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getOneCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      return res.json(category);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  addCategory: async (req, res) => {
    try {
      const category = await Category.create({ name: req.body.name });
      return res.json({ message: "Категория добавлена", category });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, { $set: req.body });
      return res.json({ message: "Категория изменена", category });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      return res.json({ message: "Категория удалена", category });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
};
