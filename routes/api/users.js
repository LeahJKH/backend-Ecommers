//imports
const path = require("path");
const express = require("express");
const router = express.Router();
//internal imports
const userController = require("../../controllers/userController");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/:id").get(userController.getSingleUser);

module.exports = router;
