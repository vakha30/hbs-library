const { Router } = require("express");

const router = Router();

router.use("/", require("./home.route"));
router.use("/users", require("./users.route"));
router.use("/categories", require("./categories.route"));
router.use("/books", require("./books.route"));
router.use("/reviews", require("./reviews.route"));

module.exports = router;
