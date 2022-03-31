/* eslint-disable no-unused-vars */
import axios from "axios";

export default {
  state: {
    Device: null,
    DeviceList: [],
  },
  getters: {
    Device: (state) => state.Device,
    DeviceList: (state) => state.DeviceList,
  },
  mutations: {
    setDeviceList(state, data) {
      state.DeviceList = data;
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
      console.log("actions 1", payload);
      await axios.patch("http://localhost:8080/devices/ready", {
        readyState: payload.readyState,
        deviceName: payload.deviceName,
      });
    },
  },
};
