const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const login = async (req, res) => {
  const { username, password } = req.body;
  const existUser = await User.findOne({ username });
  if (!existUser) {
    return res.status(401).json({ message: "Couldnt find this user" });
  }
  bcrypt.compare(password, existUser.password, (err, isMatch) => {
    if (err || !isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    } else {
      console.log(process.env.SECRET);
      const token = jwt.sign({ id: existUser._id }, process.env.SECRET);
      res.json({ token });
      // res
      //   .cookie("token", token, { maxAge: 4 * 60 * 60 * 1000, httpOnly: false })
      //   .send();
      // return res.status(201).json({message: "Logged in succesfully!"})
    }
  });
};

const register = async (req, res) => {
  const { username, password, email, fullname, birthdate } = req.body;
  try {
    const registerExists = await User.findOne({ username: req.body.username });
    if (registerExists) {
      return res.status(400).json("User is already registered!");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      fullname,
      email,
      birthdate,
    });
    return res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
  //   console.log(newUser);
};

module.exports = { login, register };
