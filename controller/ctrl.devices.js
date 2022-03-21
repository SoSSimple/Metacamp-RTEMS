const Device = require("../models/devices.js");

const getDevices = async (req, res, next) => {};

const createDevice = async (req, res, next) => {
  try {
    const { deviceName, readyState, operatingState } = req.body;
    await Device.create({
      deviceName,
      readyState,
      operatingState,
    });
    res.status(201).json({
      data: {
        deviceName,
        readyState,
        operatingState,
      },
    });
  } catch (error) {
    console.error(`createDevice error: ${error}`);
  }
};

module.exports = {
  getDevices,
  createDevice,
};
