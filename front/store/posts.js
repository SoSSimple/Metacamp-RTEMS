export const state = () => ({
  mainPosts: [],
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload)
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
};

export const actions = {
  add({ commit }, payload) {
    // posts안붙여주는이유는 여기 모듈에서 알아서 posts/가 메인인걸 알기때문
    commit('addMainPost', payload);
    // commit('addMainPost', payload, { root: true}); 시 인덱스꺼 호출가능
  },
    remove({ commit }, payload) {
      commit('removeMainPost', payload);
  },
}