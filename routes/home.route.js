const { Router } = require("express");
const { homeController } = require("../controllers/home.controller");

const router = Router();

router.get("/", homeController.home);

module.exports = router;
