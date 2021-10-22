const { Router } = require("express");

const router = Router();

router.use("/users", require("./users.route"));
router.use("/categories", require("./categories.route"));
router.use("/books", require("./books.route"));

module.exports = router;
