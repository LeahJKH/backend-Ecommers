const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const hashedPwd = bcrypt.hash(pwd, 13);
const newUser = { username: user, pwd: hashedPwd };
console.log(newUser);
userSave(user, hashedPwd);

const userSave = async (name, pwd) => {
  const data = await fsPromises.readFile(path.join(__dirname, "users.txt"), "utf8");
  console.log(data);

  await fsPromises.appendFile(path.join(__dirname, "users.txt"), `\nname: ${name}, pwd: ${pwd}`);

  const newdata = await fsPromises.readFile(path.join(__dirname, "users.txt"), "utf8");
  console.log(newdata);
};
