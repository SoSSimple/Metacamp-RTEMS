<template>
  <!-- <div ref="webgl">
    <helloEdukit />
  </div> -->
  <helloEdukit />
</template>

<script>
import Three from "../js/example.js";

let helloEdukit = {
  template: `<div ref="webgl"></div>`,
  mounted() {
    Three(this.$refs.webgl);
  },
};

export default {
  name: "edukit",
  components: {
    helloEdukit,
  },
};
</script>

<style scoped></style>
