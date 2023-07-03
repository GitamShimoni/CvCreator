const mongoose = require("mongoose");
require("dotenv").config();
const mongooseInit = () => {
  const { MONGOATLAS } = process.env;
  mongoose
    .connect(MONGOATLAS, {})
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.log("Unable to connect to MongoDB Atlas");
      console.error(err);
    });
};
module.exports = { mongooseInit };
