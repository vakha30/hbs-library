const User = require("../models/User.model");

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate("arendBooks").lean();
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getOneUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate("arendBooks").lean();
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  blockUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, { isBlocked: true });
      return res.json({ message: "Пользователь заблокирован" });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  unblockUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, { isBlocked: false });
      return res.json({ message: "Пользователь разблокирован" });
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
