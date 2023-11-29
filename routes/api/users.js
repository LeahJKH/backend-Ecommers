const express = require("express");
const router = express.Router();
const path = require("path");
const registerController = require("../../controllers/registerController");

const data = {};
data.users = require("../../model/users.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.users);
  })
  .post(registerController.handleNewUser)
  .put((req, res) => {
    res.json({
      username: req.body.username,
      password: req.body.password,
    });
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

module.exports = router;
