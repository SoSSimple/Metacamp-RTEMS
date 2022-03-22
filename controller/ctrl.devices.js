const Device = require("../models/devices.js");
const User = require("../models/users.js");

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
  }
};

const getDevice = async (req, res, next) => {
  const id = req.params.id;
  try {
    const exDevice = await Device.findOne({ where: { id } });
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
  }
};

const getDeviceLog = async (req, res, next) => {
  try {
    const device = await Device.findOne({ where: req.body.deviceId });
    if (device) {
      const resultDeviceLogs = await device.getDeviceLogs({
        where: req.body.id,
      });
      res.status(201).json({ resultDeviceLogs });
    } else {
      res.status(404).send("no device");
    }
  } catch (error) {
    console.error(error);
    next(error);
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
  const { readyState, id } = req.body;
  const opState = await Device.findOne({ where: id });
  try {
    if (opState.operatingState == 0) {
      await Device.update({ readyState }, { where: { id } });
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
          return res
            .status(409)
            .json({ msg: "현재 이미 가동중인 상태입니다." });
        }
        const user = await User.findOne({ where: userId });
        if (user) {
          await user.addDeviceUserLogs(parseInt(deviceId, 10));
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
        const opState = await Device.findOne({ where: id });
        if (opState.operatingState == operatingState) {
          return res
            .status(409)
            .json({ msg: "현재 이미 비가동중인 상태입니다." });
        }
        await Device.update({ operatingState }, { where: { id } });
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
          msg: "해당 장비의 상태가 준비상태가 되어있을 때 가동 시킬 수 있습니다.",
        },
      });
    }
  } catch (error) {
    console.error(`operatingDevice error: ${error}`);
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
};
