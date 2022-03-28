export const state = () => ({
  me: null,
  mainUsers: [],
  hasMoreUser: true,
});


// payload 는 state를 수정하는데 사용된다
// mutations은 비동기 작업이 존재하면 안된다
// settimeout promise ajax axios 기타 등등

const totalUsers = 51;
const limit = 10;

export const mutations = {
  setMe(state, payload) {
    state.me = payload
  },
  loadUsers(state) {
    const diff = totalUsers - state.mainUsers.length; // 아직 안 불러온 게시글 수
    const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
      no: 1, userId: 'name123', role: '사원', department: '개발부'
    }));
    state.mainUsers = state.mainUsers.concat(fakeUsers);
    state.hasMorePost = fakeUsers.length === limit;
  },
  }

// 비동기 작업을위한 actions
// context 안에는 commit, dispatch, state, rootstate, getters, rootGetters 가 존재한다
// mutations은 commit으로 실행한다
export const actions = {
  // signUp(context, payload) {
  signUp({ commit }, payload) {
    commit('setMe', payload)
  },
  login({ commit }, payload) {
    commit('setMe', payload)
  },
  logOut({ commit }, payload) {
    commit('setMe', null)
  },
  loadUsers({ commit, state}, payload) {
    if (state.hasMoreUser) {
      commit('loadUsers')
    }
  }
}