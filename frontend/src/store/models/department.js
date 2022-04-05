// import axios from "axios";
/* eslint-disable no-unused-vars */

const stateInit = {
  Department: {
    id: null,
    name: null,
    code: null,
    description: null,
    createdAt: null,
    updatedAt: null,
  },
};

export default {
  state: {
    DepartmentList: [],
    Department: { ...stateInit.Department },
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
    InputMode: null,
  },
  getters: {
    DepartmentList: (state) => state.DepartmentList,
    Department: (state) => state.Department,
    DepartmentInsertedResult: (state) => state.InsertedResult,
    DepartmentUpdatedResult: (state) => state.UpdatedResult,
    DepartmentDeletedResult: (state) => state.DeletedResult,
    DepartmentInputMode: (state) => state.InputMode,
  },
  mutations: {
    setDepartmentList(state, data) {
      state.DepartmentList = data;
    },
    setDepartment(state, data) {
      state.Department = data;
    },
    setInsertedResult(state, data) {
      state.DepartmentList.push(data);
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data;
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data;
    },
    setInputMode(state, data) {
      state.InputMode = data;
    },
  },
  actions: {
    actDepartmentList(context) {
      const departmentList = [
        {
          id: 1,
          name: "개발팀",
          code: "dev",
          description: "hello",
        },
        {
          id: 2,
          name: "영업팀",
          code: "sales",
          description: "world!",
        },
      ];
      context.commit("setDepartmentList", departmentList);
    },
    actDepartmentInsert(context, payload) {
      context.commit("setInsertedResult", payload);
      setTimeout(() => {
        const insertedResult = 1;
        context.commit("setInsertedResult", insertedResult);
      }, 300);
    },
    // 부서정보 초기화
    actDepartmentInit(context, payload) {
      context.commit("setDepartment", { ...stateInit.Department });
    },
    // 입력모드 설정
    actDepartmentInputMode(context, payload) {
      context.commit("setInputMode", payload);
    },
    actDepartmentInfo(context, payload) {
      context.commit("setDepartment", { ...stateInit.Department });

      setTimeout(() => {
        const departmentList = [
          {
            id: 1,
            name: "개발팀",
            code: "dev",
            description: "hello",
          },
          {
            id: 2,
            name: "영업팀",
            code: "sales",
            description: "world!",
          },
        ];

        let department = { ...stateInit.department };
        for (let i = 0; i < departmentList.length; i += 1) {
          if (payload === departmentList[i].id) {
            department = { ...departmentList[i] };
          }
        }
        context.commit("setDepartment", department);
      }, 300);
    },
    actDepartmentUpdate(context, payload) {
      context.commit("setUpdatedResult", null);
    },
    actDepartmentDelete(context, payload) {
      context.commit("setDeletedResult", null);
    },
  },
};
