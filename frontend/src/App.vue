<template>
  <div>
    <app-header v-if="this.$route.meta.header !== false" />
    <router-view class="main" />
    <app-footer />
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
};
</script>

<style>
body {
  background-color: #f0f2f5 !important;
}
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
}
.main table {
  margin-top: 100px;
}
</style>
