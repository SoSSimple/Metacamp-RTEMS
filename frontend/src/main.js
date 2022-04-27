// import Vue from "vue";
import Vue from "vue/dist/vue.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import Meta from "vue-meta";

// bootstrap
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// vue-session
import VueSession from "vue-session";

var sessionOptions = {
  persist: true,
};

Vue.use(BootstrapVue);
Vue.use(VueSession, sessionOptions);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(Meta);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
