const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const refreshController = require("../controllers/refreshController");

//get accessToken from auth (json response when logging in), and put in Bearer token for authentication for refresh to verify
router.post("/", verifyJWT, refreshController.handleRefresh);

module.exports = router;
