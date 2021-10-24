const Book = require("../models/Book.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model");
const Review = require("../models/Review.model");

module.exports.booksController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find().lean();
      const categories = await Category.find().lean();

      categories.forEach((item) => (item.userId = req.params.userId));
      books.forEach((item) => (item.userId = req.params.userId));

      return res.render("books", { books, categories, userId: req.params.userId });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getBooksByCategory: async (req, res) => {
    try {
      const books = await Book.find({ category: req.params.categoryId }).lean();
      const categories = await Category.find().lean();

      categories.forEach((item) => (item.userId = req.params.userId));
      books.forEach((item) => (item.userId = req.params.userId));

      return res.render("books", { books, categories, userId: req.params.userId });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getOnedBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId).lean();
      const categories = await Category.find().lean();
      const reviews = await Review.find({ book: req.params.bookId }).populate("user").lean();
      categories.forEach((item) => (item.userId = req.params.userId));
      book.comments = reviews;

      book.userId = req.params.userId;
      return res.render("one-book", { book, categories, userId: req.params.userId });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  rentBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId).lean();
      const user = await User.findById(req.params.userId).lean();
      const categories = await Category.find().lean();
      const reviews = await Review.find({ book: req.params.bookId }).populate("user").lean();

      if (user.isBlocked) {
        categories.forEach((item) => (item.userId = req.params.userId));
        book.comments = reviews;
        book.userId = req.params.userId;
        book.isBlocked = true;
        return res.render("one-book", { book, categories, userId: req.params.userId });
      }

      if (book.isArend) {
        return res.json({ message: "Книга уже арендована" });
      }

      if (user.arendBooks.length >= 3) {
        categories.forEach((item) => (item.userId = req.params.userId));
        book.comments = reviews;
        book.userId = req.params.userId;
        book.limit = true;
        return res.render("one-book", { book, categories, userId: req.params.userId });
      }

      await Book.findByIdAndUpdate(req.params.bookId, { isArend: true, user: req.params.userId });
      await User.findByIdAndUpdate(req.params.userId, { $push: { arendBooks: req.params.bookId } });

      return res.redirect(`/books/user/${req.params.userId}/book/${req.params.bookId}`);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  passRentBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId).lean();
      const user = await User.findById(req.params.userId).lean();

      await Book.findByIdAndUpdate(req.params.bookId, { isArend: false });
      await User.findByIdAndUpdate(req.params.userId, { $pull: { arendBooks: req.params.bookId } });

      return res.redirect(`/users/user/${req.params.userId}`);
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
