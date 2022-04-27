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
}

#app div :nth-child(3) {
  margin-bottom: 15px;
}
#app div > :nth-child(3) input {
  margin-right: 10px;
}
.close-button {
  display: none !important;
}
.dg {
  position: absolute !important;
  width: 300px !important;
  top: 350px;
  left: 50px;
}
.dg ul {
  border-radius: 5px !important;
}
.dg li {
  height: 250px;
}
.dg li.title {
  cursor: pointer;
  display: none;
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
  padding: 12px !important;
  font-size: 25px !important;
}
.dg li.folder {
  padding: 0;
  border-left: 0px solid #1b1b1b;
}
.dg + div {
  display: block;
  position: absolute;
  top: 830px;
  left: 100px;
}

.cr {
  height: 50px !important;
  padding: 0px !important;
}

.property-name {
  padding: 12px;
  text-align: center;
  font-size: 23px;
}
.slider {
  display: none !important;
}
</style>
