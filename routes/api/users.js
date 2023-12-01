const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../../controllers/userController");

const data = {};
data.users = require("../../model/users.json");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
