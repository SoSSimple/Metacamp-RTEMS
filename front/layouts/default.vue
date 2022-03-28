<template>
  <v-app>
    <nav v-if="!me">
      <v-toolbar dark color="black">
        <v-app-bar-nav-icon @click="onDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <nuxt-link to="/">메인페이지</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-text-field label="검색" hide-details="" prepend-icon="mdi-magnify" :style="{ display: 'flex', alignItems: 'center'}" />
          <v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center'}">
            <div>회원가입</div>
          </v-btn>
          <v-btn text nuxt to="/login" :style="{ display: 'flex', alignItems: 'center'}">
            <div>로그인</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <nav v-else>
      <v-app-bar-nav-icon @click="onDrawer"></v-app-bar-nav-icon>
      <v-toolbar dark color="black">
        <v-toolbar-title>
          <nuxt-link to="/">메인페이지</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-text-field label="검색" hide-details="" prepend-icon="mdi-magnify" :style="{ display: 'flex', alignItems: 'center'}" />
          <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center'}">
            <div>마이페이지</div>
          </v-btn>
          
          <v-btn text nuxt to="/logout" :style="{ display: 'flex', alignItems: 'center'}">
            <div @click="onLogOut">로그아웃</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      v-if="!me"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title> 님 안녕하세요</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
     <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      v-else
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ me.name }} 님 안녕하세요</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <nuxt />
  </v-app>
</template>

<script>
  export default {
    data () {
        return {
          drawer: false,
          items: [
            { title: 'Home', icon: 'mdi-view-dashboard' },
            { title: 'About', icon: 'mdi-forum' },
          ],
        }
      },
    computed: {
      me() {
        return this.$store.state.users.me
      }
    },
    methods: {
      onLogOut() {
        this.$store.dispatch('users/logOut')
      },
      onDrawer() {
        this.drawer = !this.drawer
      }
    }
  }
</script>

<style scoped>
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
</style>