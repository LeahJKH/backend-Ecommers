const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

let data = {};
data = require("../model/users.json");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

//not functional
//was thinking it could be useful for an admin to be able to find and remove malignant users, but right now, in this version they cannot GET said users, though they can still just look in the literal "database"
const getAllUsers = (req, res) => {
  res.json(data);
  //res.json(usersDB.users);
};

const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  const duplicate = usersDB.users.find((person) => person.username === username);
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedpassword = await bcrypt.hash(password, 13);
    const newUser = { username: username, password: hashedpassword };
    console.log(newUser);
    userSave();
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.status(201).json({ success: `New user ${username} has been created!` }); //newUser
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
