const express = require("express");
const router = express.Router();

const ctrlInflux = require("../controller/ctrl.influx.js");

/* localhost:8080/influx */
// influxdb에 값 넣기
router.post("/", ctrlInflux.postInflux);

// mqtt
// router.post("/", ctrlInflux.postInflux);

// localhost:8080/influx/log
// influxdb 값 가져오기
router.get("/times", ctrlInflux.getInflux);

module.exports = router;
