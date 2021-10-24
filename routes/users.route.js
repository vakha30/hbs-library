const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");

const router = Router();

router.get("/", usersController.getAllUsers);
router.get("/user/:userId", usersController.getOneUser);
router.get("/admin/", usersController.getAllUsersForAdmin);
router.get("/admin/user/:userId", usersController.getOneUserForAdmin);
router.get("/admin/user/:userId/block", usersController.blockUser);
router.get("/admin/user/:userId/unblock", usersController.unblockUser);

router.post("/", usersController.addUser);
router.patch("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
