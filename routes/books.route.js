const { Router } = require("express");
const { booksController } = require("../controllers/books.controller");

const router = Router();

router.get("/user/:userId", booksController.getAllBooks);
router.get("/user/:userId/:categoryId", booksController.getBooksByCategory);
router.get("/user/:userId/:bookId", booksController.getOnedBook);
router.get("/user/:userId/book/:bookId/rent", booksController.rentBook);

router.post("/", booksController.adddBook);
router.patch("/:id", booksController.updatedBook);
router.delete("/:id", booksController.deletedBook);

module.exports = router;
