const Device = require("../models/devices.js");

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
  try {
    await Device.update({ readyState }, { where: { id } });
    const message = `${!readyState}에서 ${readyState}으로 변경됨`;
    return res.status(201).json({
      data: {
        success: true,
        msg: message,
      },
    });
  } catch (error) {
    console.error(`readyDevice error: ${error}`);
    return next(error);
  }
};

const operatingDevice = async (req, res, next) => {
  const { operatingState, id } = req.body;
  try {
    await Device.update({ operatingState }, { where: { id } });
    const message = `${!operatingState}에서 ${operatingState}으로 변경됨`;
    return res.status(201).json({
      data: {
        success: true,
        msg: message,
      },
    });
  } catch (error) {
    console.error(`operatingDevice error: ${error}`);
    return next(error);
  }
};

module.exports = {
  getDevices,
  getDevice,
  createDevice,
  readyDevice,
  operatingDevice,
};
