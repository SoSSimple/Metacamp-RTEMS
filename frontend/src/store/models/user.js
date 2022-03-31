/* eslint-disable no-unused-vars */
import axios from "axios";

export default {
  state: {
    me: null,
    UserList: [],
  },
  getters: {
    me: (state) => state.me,
    UserList: (state) => state.UserList,
  },
  mutations: {
    setMe(state, data) {
      state.me = data;
    },
    setUserList(state, data) {
      state.UserList = data;
    },
  },
  actions: {
    async actUserLogin(context, payload) {
      await axios
        .post("http://localhost:8080/users/login", {
          userId: payload.userId,
          password: payload.password,
        })
        .then((response) => {
          const user = {
            userId: response.data.data.userId,
            role: response.data.data.role,
            name: response.data.data.name,
            department: response.data.data.department,
          };
          context.commit("setMe", user);
        })
        .catch((err) => {
          console.log(err);
          alert("로그인 실패");
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
  },
};
