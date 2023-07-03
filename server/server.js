const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authenticatedRoutes = require("./src/routes/Authenticated/authenticated.route");
const unauthenticatedRoutes = require("./src/routes/unauthenticated/unauthenticated.route");

const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const { mongooseInit } = require("./src/DB/mongooseInit");

app.use(cors(), express.json(), helmet(), cookieParser());

app.use("/unauth", unauthenticatedRoutes);
app.use("/", authenticatedRoutes);

app.listen(5000, () => {
  mongooseInit();
  console.log("Server running on port 5000");
});
