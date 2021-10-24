const { Router } = require("express");
const { reviewsController } = require("../controllers/reviews.controller");

const router = Router();

router.get("/", reviewsController.getAllreviews);
router.get("/book/:bookId", reviewsController.getReviewsByBook);
router.get("/:id", reviewsController.getOneReview);

router.post("/user/:userId/book/:bookId", reviewsController.addReview);
router.patch("/:id", reviewsController.updateReview);
router.delete("/:id", reviewsController.deleteReview);

module.exports = router;
