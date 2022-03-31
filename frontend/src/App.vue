<template>
  <div>
    <app-header />
    <router-view />
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
