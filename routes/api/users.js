const express = require("express");
const router = express.Router();
const path = require("path");
const registerController = require("../../controllers/userController");

const data = {};
data.users = require("../../model/users.json");

router
  .route("/")
  .get(registerController.getAllUsers)
  .post(registerController.createNewUser)
  .put(registerController.updateUser)
  .delete(registerController.deleteUser);

module.exports = router;
