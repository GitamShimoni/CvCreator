const userService = require("../../controllers/user.controller");
const express = require("express");

const router = express.Router();

router.route("/getUser").post(userService.getUser);
router.route("/getUsers").post(userService.getUsers);

module.exports = router;
