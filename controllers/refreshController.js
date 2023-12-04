const User = require("../model/User");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies) return res.status(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign({ username: decoded.username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    res.json({ accessToken });
  });
};

module.exports = { handleRefresh };
