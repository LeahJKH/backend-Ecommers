const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find().exec();
  if (!users) return res.status(204).json({ message: "No users found!" });
  res.json(users);
};

const createUser = async (req, res) => {
  if (!req?.body?.username || !req?.body?.password) {
    return res.status(400).json({ message: "username and password are required!" });
  }
  try {
    const result = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json(result);
  } catch (err) {
    console.errror(err);
  }
};

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    res.status(400).json({ message: "Please enter an ID to search for." });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `No user matched ID ${req.body.id}` });
  }
  if (req.body?.username) user.username = req.body.username;
  if (req.body?.password) user.password = req.body.password;
  const result = await user.save();
  res.json(result);
};

const deleteUser = async (res, req) => {
  if (!req?.body?.id) {
    res.status(400).json({ message: "Please enter an ID to search for." });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `No user matched ID ${req.body.id}` });
  }
  const result = user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getSingleUser = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: "Please enter an ID to search for." });
  }
  //look for the _id, the objectID provided by MongoDB automatically, and match it to the id in the request (without _ )
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `No user matched ID ${req.params.id}` });
  }
  res.json(user);
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getSingleUser };
