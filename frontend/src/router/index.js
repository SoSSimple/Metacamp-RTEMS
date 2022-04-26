import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { header: false },
    component: Home,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard.vue"),
  },
  {
    path: "/example",
    name: "example",
    component: () => import("../views/example.vue"),
  },
  {
    path: "/user",
    name: "user",
    meta: { authRequired: true },
    component: () => import("../views/user/user.vue"),
  },
  {
    path: "/device",
    name: "device",
    component: () => import("../views/device/device.vue"),
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
    path: "/webgl",
    name: "webgl",
    component: () => import("../views/webgl/webgl.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("../views/mypage.vue"),
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

router.beforeEach(function (to, from, next) {
  // to: 이동할 url에 해당하는 라우팅 객체
  if (
    to.matched.some(function (routeInfo) {
      return routeInfo.meta.authRequired;
    }) &&
    sessionStorage.role !== "admin"
  ) {
    // 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
    alert("관리자 계정으로 로그인 해주세요");
  } else {
    console.log("routing success : '" + to.path + "'");
    next(); // 페이지 전환
  }
});

export default router;
