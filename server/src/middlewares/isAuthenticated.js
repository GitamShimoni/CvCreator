const jwt = require("jsonwebtoken");

require("dotenv").config();

const isAutheticated = (req, res, next) => {
  const token = req.headers.token;
  const userId = jwt.verify(token, process.env.SECRET);

  if (!userId) {
    res.status(401).send();
    return;
  }
  req.userId = userId;
  next();
};

module.exports = isAutheticated;
