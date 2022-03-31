import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard.vue"),
  },
  {
    path: "/department",
    name: "department",
    component: () => import("../views/department.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/user.vue"),
  },
  {
    path: "/device",
    name: "device",
    component: () => import("../views/device.vue"),
  },
  {
    path: "/workorder",
    name: "workorder",
    component: () => import("../views/workorder.vue"),
  },
  {
    path: "/result",
    name: "result",
    component: () => import("../views/result.vue"),
  },
  {
    path: "*",
    component: () => import("../components/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
