export default {
  state: {
    DepartmentList: [],
  },
  getters: {
    DepartmentList: (state) => state.DepartmentList,
  },
  mutations: {
    setDepartmentList(state, data) {
      state.DepartmentList = data;
    },
  },
  actions: {
    // 부서 리스트 조회
    actDepartmentList(context) {
      /* 테스트 데이터 세팅 */
      const departmentList = [
        {
          id: 1,
          name: "개발팀",
          code: "dev",
          createdAt: "2021-12-01T00:00:00.000Z",
        },
        {
          id: 2,
          name: "영업팀",
          code: "sales",
          createdAt: "2021-12-01T00:00:00.000Z",
        },
      ];
      context.commit("setDepartmentList", departmentList);

      /* RestAPI 호출 */
      /*
      axios.get('/serverApi/departments').then(response => {
        const departmentList = response && response.data
        context.commit('setDepartmentList', departmentList)
      })
      */
    },
  },
};
