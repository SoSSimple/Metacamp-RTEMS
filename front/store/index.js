// state 는 함수
export const state = () => ({
  hello: 'vuex',
});

// mutations는 객체
export const mutations = {
  bye(state) {
    state.hello ="goodbye";
  }
}