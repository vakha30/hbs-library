const { Router } = require("express");
const { categoriesController } = require("../controllers/categories.controller");

const router = Router();

router.get("/user/:userId", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getOneCategory);
router.post("/", categoriesController.addCategory);
router.patch("/:id", categoriesController.updateCategory);
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
