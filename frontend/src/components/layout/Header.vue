<template>
  <b-navbar class="header">
    <b-navbar-brand
      href="#"
      style="color: white; margin-left: 15px"
      @click="$router.push('/webgl')"
      >RTEMS</b-navbar-brand
    >
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <em class="dropdown">User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="onClickLogout"
            >Logout</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    onClickLogout() {
      sessionStorage.clear();
      this.$router.push("/");
      this.$router.go();
      console.log("success");
    },
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  background-color: #042331;
  padding: 25px;
  z-index: 100;
}
.dropdown {
  color: white;
  font-size: 18px;
}
</style>
