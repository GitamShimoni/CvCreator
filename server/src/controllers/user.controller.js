const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { ModuleNode } = require("vite");

const getUser = async (req, res) => {
  try {
    const realId = jwt.verify(req.headers.token, process.env.SECRET);
    const UserData = await User.findOne({ _id: realId.id });
    console.log(UserData, "This is the user DATA");
    return res.status(200).json(UserData);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const getUsers = (req, res) => {
  User.find({}).then((data) => {
    res.send(data);
  });
};

module.exports = { getUser, getUsers };
