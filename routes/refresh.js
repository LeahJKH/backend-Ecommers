const express = require("express");
const router = express.Router();

const refreshController = require("../controllers/refreshController");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/", verifyJWT, refreshController.handleRefreshToken);

module.exports = router;
