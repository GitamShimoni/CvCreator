const express = require("express");
const router = express.Router();
const infoController = require("../../controllers/info.controller");

router.post("/fetchinfo", infoController.fetchInfo);
router.post("/createinfo", infoController.CreateInfo);
router.post("/fetchcvinfo", infoController.getCvsByToken);

module.exports = router;
