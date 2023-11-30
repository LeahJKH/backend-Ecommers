const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  const duplicate = placeholderforaduplicate;
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedPwd = await bcrypt.hash(pwd, 13);
    const newUser = { username: user, pwd: hashedPwd };
    console.log(newUser);
    userSave(user, hashedPwd);
    res.status(201).json({ success: `New user ${user} has been created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const userSave = async (name, pwd) => {
  await fsPromises.appendFile(
    path.join(__dirname, "..", "users.txt"),
    `\nname: ${name}, pwd: ${pwd}`
  );
};

module.exports = { handleNewUser };
