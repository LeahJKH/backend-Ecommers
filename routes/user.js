const express = require("express");
const router = express.Router();

const registerController = require("../controllers/userController");

router.post("/", registerController.createNewUser);

module.exports = router;
