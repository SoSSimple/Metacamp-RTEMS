<template>
  <div>
    <b-row>
      <b-col cols="2">
        <app-sidebar />
      </b-col>
      <b-col>
        <div id="app">
          <edukit />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Sidebar from "../../components/layout/Sidebar.vue";
import edukit from "./webglIndex.vue";

export default {
  name: "App",
  components: {
    "app-sidebar": Sidebar,
    edukit,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
