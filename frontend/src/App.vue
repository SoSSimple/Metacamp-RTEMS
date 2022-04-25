<template>
  <div>
    <app-header v-if="this.$route.meta.header !== false" />
    <router-view class="main" />
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";

export default {
  components: {
    "app-header": Header,
  },
};
</script>

<style>
body {
  background-color: #f0f2f5 !important;
}

.main table {
  margin-top: 100px;
}
</style>
