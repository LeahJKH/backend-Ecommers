const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
//const verifyJWT = require("../middleware/verifyJWT");

router.post("/", authController.handleLogin);

module.exports = router;
