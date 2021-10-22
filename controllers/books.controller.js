const Book = require("../models/Book.model");
const User = require("../models/User.model");

module.exports.booksController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find().lean();
      return res.json(books);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getBooksByCategory: async (req, res) => {
    try {
      const books = await Book.find({ category: req.params.categoryId }).lean();
      return res.json(books);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getOnedBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId).lean();
      return res.json(book);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  rentBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId).lean();
      const user = await User.findById(req.params.userId).lean();

      if (user.isBlocked) {
        return res.json({ message: "Вы забанены" });
      }

      if (book.isArend) {
        return res.json({ message: "Книга уже арендована" });
      }

      if (user.arendBooks.length >= 3) {
        return res.json({ message: "Можноиметь только 3 книги" });
      }

      await Book.findByIdAndUpdate(req.params.bookId, { isArend: true });
      await User.findByIdAndUpdate(req.params.userId, { $push: { arendBooks: req.params.bookId } });

      return res.json({ message: "Книга арендованна", book });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  adddBook: async (req, res) => {
    try {
      const book = await Book.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
      });
      return res.json({ message: "Книга добавлена", book });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  updatedBook: async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, { $set: req.body });
      return res.json({ message: "Книга изменена", book });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  deletedBook: async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      return res.json({ message: "Книга удалена", book });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
};
