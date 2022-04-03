<template>
  <div>
    <div>
      <b-row>
        <b-col cols="2">
          <app-sidebar />
        </b-col>
        <b-col>
          <div>
            <h1>WebGL</h1>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/layout/Sidebar.vue";

export default {
  components: {
    "app-sidebar": Sidebar,
  },
};
</script>

<style lang="scss" scoped></style>
