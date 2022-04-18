<template>
  <div>
    <div style="margin-bottom: 5px; width: 100%">
      <b-row>
        <b-col cols="2">
          <app-sidebar />
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

<style scoped>
.col {
  margin-top: 20px;
}
</style>
