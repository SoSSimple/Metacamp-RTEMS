<template>
  <v-app>
    <nav v-if="!me">
      <v-toolbar dark color="black">
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
          {{me.name}} 님 안녕하세요
          <v-btn text nuxt to="/logout" :style="{ display: 'flex', alignItems: 'center'}">
            <div @click="onLogOut">로그아웃</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row>
      <!-- <v-col cols="12" md="2">
        <v-sheet
          height="100vh"
          class="overflow-hidden"
          style="position: relative;"
        >
          <v-container class="fill-height">
            <v-row
              :style="{display: 'flex'}"
            >
              <v-btn
                color="pink"
                dark
                @click.stop="drawer = !drawer"
              >
                Toggle
              </v-btn>
            </v-row>
          </v-container>

          <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
          >
            <v-list dense>
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="10"> -->
      <nuxt />
      <!-- </v-col> -->
    </v-row>
  </v-app>
</template>

<script>
  export default {
    data () {
        return {
          drawer: null,
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