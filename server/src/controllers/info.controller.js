const info = require("../models/info");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.fetchInfo = async (req, res) => {
  try {
    const getInfo = await info.find({ _id: req.body._id });
    return res.status(200).json(getInfo);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.getCvsByToken = async (req, res) => {
  try {
    const realId = jwt.verify(req.headers.token, process.env.SECRET);
    const user = await User.findOne({ _id: realId.id }).populate("info");
    const cvsArr = user.info;

    if (!user) {
      return res.status(401).json({ message: "not loggeed in" });
    } else {
      return res.status(202).json(cvsArr);
    }
  } catch (err) {
    res.status(501).send(err);
  }
};
exports.CreateInfo = async (req, res) => {
  try {
    const newInfo = await info.create(req.body);
    const updateUser = await User.findByIdAndUpdate(req.body.id, {
      $push: { info: { _id: newInfo._id } },
    });
    return res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// console.log(req.body);
// console.log(newInfo, "This is the Incoming INFO");
// const currentUser = await User.findOne({_id:req.body.id})
// const currentInfo = currentUser.info;
// currentInfo.push(newInfo)
// console.log(currentInfo);
