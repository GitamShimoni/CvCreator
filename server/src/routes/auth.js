const express = require("express");
const isAutheticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.use(isAutheticated);

router.route("/").get(authController.users);

router.route("/login").post(authController.login);

router.route("/getuser").post(authController.translateToken);

router.route("/register").post(authController.register);

module.exports = router;
