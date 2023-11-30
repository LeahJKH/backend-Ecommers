const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
};
