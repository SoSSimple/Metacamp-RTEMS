export const state = () => ({
  me: null,
});


// payload 는 state를 수정하는데 사용된다
// mutations은 비동기 작업이 존재하면 안된다
// settimeout promise ajax axios 기타 등등
export const mutations = {
  setMe(state, payload) {
    state.me= payload
  }
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
    this.$axios.post('http://localhost:3000/users/login',{
      userId: payload.userId,
      password: payload.password
    })
    commit('setMe', payload)
  },
  logOut({ commit }, payload) {
    commit('setMe', null)
  }
}