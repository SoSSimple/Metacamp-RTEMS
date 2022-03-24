const express = require("express");
const router = express.Router();

const ctrlDevices = require("../controller/ctrl.devices.js");

// GET /devices 모든 장비 정보 가져오기
router.get("/", ctrlDevices.getDevices);

// GET /devices/:id/deviced id로 특정 장비만 가져오기
router.get("/:id/deviced", ctrlDevices.getDevice);

// GET /devices/log 사용된 장비의 이력 가져오기
router.get("/log", ctrlDevices.getDeviceLog);

// POST /devices/create 장비 만들기
router.post("/create", ctrlDevices.createDevice);

// POST /devices/completed
router.post("/completed", ctrlDevices.completed);

// PATCH /devices/ready 특정 장비의 준비상태 바꾸기
router.patch("/ready", ctrlDevices.readyDevice);

// PATCH /devices/operating 특정 장비의 가동상태 바꾸기 및 비상정지
router.patch("/operating", ctrlDevices.operatingDevice);

module.exports = router;