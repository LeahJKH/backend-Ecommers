//imports
const path = require("path");
const express = require("express");
const router = express.Router();

router.get("^/$|index(.html?)", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "index.html"));
});

module.exports = router;
