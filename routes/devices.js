const express = require("express");
const router = express.Router();

const ctrlDevices = require("../controller/ctrl.devices.js");

router.get("/", ctrlDevices.getDevices);
router.post("/create", ctrlDevices.createDevice);

module.exports = router;
