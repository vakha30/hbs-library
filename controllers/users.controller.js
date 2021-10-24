const User = require("../models/User.model");
const Category = require("../models/Category.model");
const Book = require("../models/Book.model");

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate("arendBooks").lean();
      res.render("users", { users });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getAllUsersForAdmin: async (req, res) => {
    try {
      const users = await User.find().populate("arendBooks").lean();
      return res.render("admin-home", { users });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getOneUserForAdmin: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate("arendBooks").lean();
      return res.render("user-page-admin", { user });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getOneUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate("arendBooks").lean();
      const categories = await Category.find().lean();
      categories.forEach((item) => (item.userId = req.params.userId));

      return res.render("profile-page", { user, categories, userId: req.params.userId });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  blockUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      user.arendBooks.map(async (item) => {
        console.log(item);
        await Book.findByIdAndUpdate(item, { isArend: false, user: null });
      });

      await User.findByIdAndUpdate(req.params.userId, { arendBooks: [], isBlocked: true });

      return res.redirect(`/users/admin/user/${req.params.userId}`);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  unblockUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, { isBlocked: false });
      return res.redirect(`/users/admin/user/${req.params.userId}`);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  addUser: async (req, res) => {
    try {
      const user = await User.create({
        name: req.body.name,
      });
      return res.json({
        message: "Пользователь создан",
        user,
      });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
      return res.json({ message: "Пользователь изменен", user });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.json({ message: "Пользователь удален", user });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
};
