/* eslint-disable no-unused-vars */
import axios from "axios";

export default {
  state: {
    Device: null,
    DeviceList: [],
    EdgeOneLogs: [],
    EdgeTwoLogs: [],
    EdgeThreeLogs: [],
    InputMode: null,
  },
  getters: {
    Device: (state) => state.Device,
    DeviceList: (state) => state.DeviceList,
    EdgeOneLogs: (state) => state.EdgeOneLogs,
    EdgeTwoLogs: (state) => state.EdgeTwoLogs,
    EdgeThreeLogs: (state) => state.EdgeThreeLogs,
    DeviceInputMode: (state) => state.InputMode,
  },
  mutations: {
    setDeviceList(state, data) {
      state.DeviceList = data;
    },
    setEdgeOneLogs(state, data) {
      state.EdgeOneLogs = data;
    },
    setEdgeTwoLogs(state, data) {
      state.EdgeTwoLogs = data;
    },
    setEdgeThreeLogs(state, data) {
      state.EdgeThreeLogs = data;
    },
    setInputMode(state, data) {
      state.InputMode = data;
    },
  },

  actions: {
    async actDeviceList(context) {
      await axios
        .get("http://localhost:8080/devices/")
        .then((res) => {
          context.commit("setDeviceList", res.data.data.devices);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async actDeviceReady(context, payload) {
      await axios.patch("http://localhost:8080/devices/ready", {
        readyState: payload.readyState,
        deviceName: payload.deviceName,
      });
    },
    async actEdgeOneLogs(context, payload) {
      const deviceName = "edge-1";
      await axios
        .get(`http://localhost:8080/devices/log/${deviceName}`)
        .then((res) => {
          context.commit("setEdgeOneLogs", res.data.resultDeviceLogs);
        });
    },
    async actEdgeTwoLogs(context, payload) {
      const deviceName = "edge-2";
      await axios
        .get(`http://localhost:8080/devices/log/${deviceName}`)
        .then((res) => {
          context.commit("setEdgeTwoLogs", res.data.resultDeviceLogs);
        });
    },
    async actEdgeThreeLogs(context, payload) {
      const deviceName = "edge-3";
      await axios
        .get(`http://localhost:8080/devices/log/${deviceName}`)
        .then((res) => {
          context.commit("setEdgeThreeLogs", res.data.resultDeviceLogs);
        });
    },
    async actDeviceOperating(context, payload) {
      console.log("actions", payload);
      await axios.patch("http://localhost:8080/devices/operating", {
        operatingState: payload.operatingState,
        deviceName: payload.deviceName,
        userId: payload.userId,
      });
    },

    async actDeviceInputMode(context, payload) {
      context.commit("setInputMode", payload);
    },
  },
};
