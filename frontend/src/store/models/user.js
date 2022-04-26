/* eslint-disable no-unused-vars */
import axios from "axios";
import router from "@/router/index.js";

export default {
  state: {
    me: null,
    UserList: [],
    UpdatedResult: null,
    DeletedResult: null,
    loggedIn: false,
  },
  getters: {
    me: (state) => state.me,
    UserList: (state) => state.UserList,
    UserUpdateResult: (state) => state.UpdateResult,
  },
  mutations: {
    setMe(state, data) {
      state.me = data;
    },
    setUserList(state, data) {
      state.UserList = data;
    },
    UserUpdate(state, data) {
      state.UpdatedResult = data;
    },
    UserDelete(state, data) {
      console.log(state.me);
      state.me.splice(data, 1);
    },
  },
  actions: {
    actUserLogin(context, payload) {
      axios
        .post("http://localhost:8080/users/login", {
          userId: payload.userId,
          password: payload.password,
        })
        .then((response) => {
          alert("로그인 성공");
          const user = {
            userId: response.data.data.userId,
            role: response.data.data.role,
            name: response.data.data.name,
            department: response.data.data.department,
          };
          sessionStorage.setItem("userId", response.data.data.userId);
          sessionStorage.setItem("name", response.data.data.name);
          sessionStorage.setItem("role", response.data.data.role);
          router.push("/webgl");
          context.commit("setMe", user);
        })
        .catch((err) => {
          alert("아이디 혹은 비밀번호가 틀립니다");
        });
    },

    actSignup(context, payload) {
      axios
        .post("http://localhost:8080/users/signup", {
          userId: payload.userId,
          password: payload.password,
          name: payload.name,
          role: payload.role,
          department: payload.department,
        })
        .then((resposne) => {
          alert("회원가입성공");
        })
        .catch((err) => {
          alert("중복된 계정입니다");
        });
    },

    async actUserList(context) {
      await axios
        .get("http://localhost:8080/users/")
        .then((res) => {
          context.commit("setUserList", res.data.data.exUser);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async actUpdateUserList(context, payload) {
      await axios
        .patch(`http://localhost:8080/users/edit/`, {
          id: payload.id,
          password: payload.password,
          name: payload.name,
          role: payload.role,
          department: payload.department,
        })
        .then((res) => {
          context.commit("UserUpdate", res.config.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async actDeleteUserList(context, payload) {
      await axios
        .delete("http://localhost:8080/users/remove", {
          userId: payload.userId,
        })
        .then((res) => {
          console.log(res);
          context.commit("UserDelete", res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
