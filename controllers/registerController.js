const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  //if the request is missing either a username or a password, send error, both are required
  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  //check for a duplicate username, send conflict status if duplicate found
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    //hash and salt the password to encrypt it so not even the database admin can look up user passwords in the database
    const hashedPwd = await bcrypt.hash(pwd, 13);
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    //confirm new user has been created
    res.status(201).json({ success: `New user ${user} has been created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
