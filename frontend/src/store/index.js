import Vue from "vue/dist/vue.js";
import Vuex from "vuex";
import User from "./models/user";
import Device from "./models/device";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Device,
  },
});
