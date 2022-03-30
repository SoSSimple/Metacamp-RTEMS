import throttle from 'lodash/throttle'

export const state = () => ({
  me: null,
  mainUsers: [],
  hasMoreUser: true,
});

// payload 는 state를 수정하는데 사용된다
// mutations은 비동기 작업이 존재하면 안된다
// settimeout promise ajax axios 기타 등등

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  loadUsers(state, payload) {
    if (payload.reset) {
      state.mainUsers = payload.data;
    } else {
      state.mainUsers = state.mainUsers.concat(payload.data);
    }
    state.hasMorePost = payload.data.length === 10;
  },
};

// 비동기 작업을위한 actions
// context 안에는 commit, dispatch, state, rootstate, getters, rootGetters 가 존재한다
// mutations은 commit으로 실행한다
export const actions = {
  // signUp(context, payload) {
  signUp({ commit }, payload) {
    this.$axios.post('/users/signup', {
      name: payload.name,
      userId: payload.userId,
      password: payload.password,
      department: payload.department,
      role: payload.role
    }).then((res) => {
      commit("setMe", res);
      alert('회원가입 성공')
      this.$router.push({
        path: '/'
      })
    }).catch((err) => {
      alert('아이디가 중복됩니다.')
      console.error(err)
    })
  },

  login({ commit }, payload) {
    this.$axios.post('/users/login',{
      userId: payload.userId,
      password: payload.password
    }).then((res) => {
      alert('로그인 성공')
      commit('setMe', res)
      this.$router.push({
        path: '/'
      })
    }).catch((err) => {
      alert('아이디 또는 비밀번호가 틀립니다')
      console.error(err)
    })
  },

  logOut({ commit }, payload) {
    this.$axios.post('/users/logout')
      .then(() => {
        alert('로그아웃 성공')
        commit("setMe", null);
        this.$router.push({
          path: '/'
        })
      })
      .catch((err) => {
        console.error(err)
      })
  },
  loadUsers: throttle(async function({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get("/users?limit=10");
        commit('loadUsers', {
          data: res.data.data.exUser, 
          reset: true
        });
        return;
      }
      // if (state.hasMorePost) {
      //   const lastPost = state.mainPosts[state.mainPosts.length - 1];
      //   const res = await this.$axios.get(`/posts?lastId=${lastPost && lastPost.id}&limit=10`);
      //   commit('loadUsers', {
      //     data: res.data,
      //   });
      //   return;
      // }
    } catch (err) {
      console.error(err);
    }
  }, 2000),
};
