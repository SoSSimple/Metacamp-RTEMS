<template>
  <div>
    <b-row>
      <b-col>
        <div id="app">
          <edukit />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import edukit from "./webglIndex.vue";

export default {
  name: "App",
  components: {
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
  margin-left: 200px;
  margin-top: 150px;
}

#app div :nth-child(3) {
  margin-bottom: 15px;
}
#app div > :nth-child(3) input {
  margin-right: 10px;
}
.dg li.title {
  cursor: pointer;
  margin-left: 2px;
}

.dg input {
  margin: -3px;
}
.dg .c input[type="text"] {
  margin-top: 0px;
  border: 0;
  padding: 0px;
  width: 100%;
  /* float: right; */
}
.c div input {
  margin: 0px;
  text-align: center;
}
.dg li.folder {
  padding: 0;
  border-left: 0px solid rgba(0, 0, 0, 0);
}
</style>
