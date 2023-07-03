const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const infoRoutes = require("./info.route");
const userRoutes = require("./user.route");

const router = express.Router();

router.use(isAuthenticated);

router.use("/info", infoRoutes);
router.use("/users", userRoutes);

module.exports = router;
