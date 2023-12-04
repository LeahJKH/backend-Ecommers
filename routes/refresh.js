const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const refreshController = require("../controllers/refreshController");

router.post("/", refreshController.handleRefresh);

module.exports = router;
