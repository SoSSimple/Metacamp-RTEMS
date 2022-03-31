import axios from "axios";

export default {
  state: {
    me: null,
    DepartmentList: [],
  },
  getters: {
    me: (state) => state.me,
  },
  mutations: {
    setMe(state, data) {
      state.me = data;
    },
  },
  actions: {
    async actUser(context, payload) {
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
  },
};
