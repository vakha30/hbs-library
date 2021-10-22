const { Router } = require("express");
const { reviewsController } = require("../controllers/reviews.controller");

const router = Router();

router.get("/", reviewsController.getAllreviews);
router.get("/book/:bookId", reviewsController.getRReviewsByBook);
router.get("/:id", reviewsController.getOneReview);

router.post("/", reviewsController.addReview);
router.patch("/:id", reviewsController.updateReview);
router.delete("/:id", reviewsController.deleteReview);

module.exports = router;
