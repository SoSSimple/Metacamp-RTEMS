const Device = require("../models/devices.js");
const User = require("../models/users.js");
const Result = require("../models/results.js");
const Pause = require("../models/pause.js");

const getDevices = async (req, res, next) => {
  try {
    const devices = await Device.findAll({});
    return res.status(200).json({
      data: {
        success: true,
        devices,
      },
    });
  } catch (error) {
    console.error(`getDevices error: ${error}`);
    return next(error);
  }
};

const getDevice = async (req, res, next) => {
  const paramId = req.params.id;
  try {
    const exDevice = await Device.findOne({ where: { id: paramId } });
    if (exDevice) {
      return res.status(200).json({
        data: {
          success: true,
          exDevice,
        },
      });
    } else {
      return res.status(401).json({
        data: {
          success: false,
          msg: "찾고자 하는 장비가 없음",
        },
      });
    }
  } catch (error) {
    console.error(`getDevice error: ${error}`);
    return next(error);
  }
};

const getDeviceLog = async (req, res, next) => {
  try {
    const device = await Device.findOne({ where: req.body.deviceId });
    if (device) {
      const resultDeviceLogs = await device.getDeviceLogs({
        where: req.body.userId,
      });
      res.status(201).json({ resultDeviceLogs });
    } else {
      res.status(404).send("no device");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const createDevice = async (req, res, next) => {
  try {
    const { deviceName, readyState, operatingState } = req.body;
    await Device.create({
      deviceName,
      readyState,
      operatingState,
    });
    return res.status(201).json({
      data: {
        success: true,
        deviceName,
        readyState,
        operatingState,
      },
    });
  } catch (error) {
    console.error(`createDevice error: ${error}`);
    return next(error);
  }
};

const readyDevice = async (req, res, next) => {
  const { readyState, deviceId } = req.body;
  const opState = await Device.findOne({ where: { id: deviceId } });
  try {
    if (opState.operatingState == 0) {
      await Device.update({ readyState }, { where: { id: deviceId } });
      const message = `${!readyState}에서 ${readyState}로 바뀝니다.`;
      return res.status(201).json({
        data: {
          success: true,
          msg: message,
        },
      });
    } else {
      return res.status(409).json({
        data: {
          success: false,
          msg: "장비가 가동중인 상태에서는 준비상태를 바꿀 수 없습니다.",
        },
      });
    }
  } catch (error) {
    console.error(`readyDevice error: ${error}`);
    return next(error);
  }
};

// 비가동에서 가동중인 상태로 바꿔야할 때
const operatingDevice = async (req, res, next) => {
  const { operatingState, deviceId, userId } = req.body;
  const opState = await Device.findOne({ where: { id: deviceId } });
  try {
    if (opState.readyState == 1) {
      if (operatingState === 1) {
        if (opState.operatingState == operatingState) {
          return res.status(409).json({
            data: { success: false, msg: "현재 이미 가동중인 상태입니다." },
          });
        }
        const user = await User.findOne({ where: userId });
        if (user) {
          await user.addDeviceUserLogs(parseInt(deviceId, 10));
          await Device.update(
            { operatingState, startedAt: Date.now() },
            { where: { id: deviceId } }
          );

          return res.status(201).json({
            data: {
              success: true,
              msg: "가동 상태로 전환",
            },
          });
        } else {
          return res.status(409).json({
            data: {
              success: false,
              msg: "존재하지 않는 유저",
            },
          });
        }
      } else {
        const opState = await Device.findOne({ where: { id: deviceId } });
        if (opState.operatingState == operatingState) {
          return res.status(409).json({
            data: { success: false, msg: "현재 이미 비가동중인 상태입니다." },
          });
        }
        await Device.update({ operatingState }, { where: { id: deviceId } });
        return res.status(201).json({
          data: {
            success: true,
            msg: "비가동 상태로 전환",
          },
        });
      }
    } else {
      return res.status(409).json({
        data: {
          success: false,
          msg: "해당 장비의 상태가 준비상태가 되어있을 때 가동 시킬 수 있습니다.",
        },
      });
    }
  } catch (error) {
    console.error(`operatingDevice error: ${error}`);
    return next(error);
  }
};

const completed = async (req, res, next) => {
  const { userId, deviceId, total, failedCount } = req.body;
  const bool = false;
  const device = await Device.findOne({ where: deviceId });
  try {
    if (!device) {
      return res.status(409).json({
        data: {
          success: false,
          msg: "가동중인 장비가 아닙니다.",
        },
      });
    }
    console.log("here1");
    const yield = (total - failedCount) / total;
    const date = await Device.findOne(
      { where: deviceId },
      { attributes: ["startedAt"] }
    );
    await Device.update({ operatingState: bool }, { where: { id: deviceId } });
    await Result.create({
      userId,
      deviceId,
      total,
      failedCount,
      yield,
      startedAt: date["startedAt"],
      endedAt: Date.now(),
    });
    return res.status(201).json({
      data: {
        success: true,
        msg: "장비 가동을 완료합니다.",
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const paused = async (req, res, next) => {
  const { deviceId } = req.body;
  const exDevice = await Device.findOne({ where: { id: deviceId } });
  try {
    if (!exDevice) {
      return res.status(400).json({
        data: {
          success: false,
          msg: "해당 장비가 존재하지 않습니다.",
        },
      });
    }

    if (exDevice["operatingState"] == false) {
      return res.status(409).json({
        data: {
          success: false,
          msg: "해당 장비는 현재 가동중인 장비가 아닙니다.",
        },
      });
    } else {
      const userId = await exDevice.getDeviceLogs({
        // attributes: ["UserId"],
        where: { DeviceId: deviceId },
      });
      console.log(userId);
      // await Device.update(
      //   { operatingState: false },
      //   { where: { id: deviceId } }
      // );
      // await Pause.create({
      //   userId,
      //   deviceId,
      // });
      return res.status(200).json({});
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDevices,
  getDevice,
  getDeviceLog,
  createDevice,
  readyDevice,
  operatingDevice,
  completed,
  paused,
};
