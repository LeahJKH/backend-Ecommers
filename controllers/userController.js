const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  res.json(usersDB.users);
};

const createNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedpassword = await bcrypt.hash(password, 13);
    const newUser = { username: user, password: hashedpassword };
    console.log(newUser);
    userSave();
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.status(201).json({ success: `New user ${user} has been created!` }); //newUser
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = (req, res) => {
  res.json({
    username: req.body.username,
    password: req.body.password,
  });
};

const deleteUser = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

const userSave = async () => {
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "usersTxt.txt"),
    JSON.stringify(usersDB.users)
  );
};

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
