const Review = require("../models/Review.model");

module.exports.reviewsController = {
  getAllreviews: async (req, res) => {
    try {
      const reviews = await Review.find().lean();
      return res.json(reviews);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getRReviewsByBook: async (req, res) => {
    try {
      const reviews = await Review.find({ book: req.params.bookId }).lean();
      return res.json(reviews);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  getOneReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id).lean();
      return res.json(review);
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  addReview: async (req, res) => {
    try {
      const review = await Review.create({
        text: req.body.text,
        user: req.params.userId,
        book: req.params.bookId,
      });
      return res.json({ message: "Комментарий добавлен", review });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  updateReview: async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, { $set: req.body });
      return res.json({ message: "Комментарий изменен", review });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
  deleteReview: async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      return res.json({ message: "Комментарий удален", review });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server error", error });
    }
  },
};
