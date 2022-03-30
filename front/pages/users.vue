<template>
  <v-card v-scroll.self="onScroll" class="overflow-y-auto" max-height="500">
    <v-card-title>
      유저정보
      <v-spacer />
      <v-text-field
        :style="{ maxWidth: '300px'}"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="mainUsers"
      class="elevation-1"
      hide-default-footer
      disable-pagination
    >
      <template #item="row">
        <tr>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.userId }}</td>
          <td>{{ row.item.role }}</td>
          <td>{{ row.item.department }}</td>
          <td>
            <v-icon color="black" dark @click="onEdit(row.item)">
              mdi-pencil
            </v-icon>
          </td>
          <td>
            <v-icon color="black" dark @click="onDelete(row.item)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import cookie from 'cookie'

export default {
  data() {
    return {
      headers: [
        { text: "name", value: "name" },
        { text: "userId", value: "userId" },
        { text: "role", value: "role" },
        { text: "department", value: "department" },
        { text: "edit", value: "edit" },
        { text: "delete", value: "delete" },
      ],
    };
  },
  fetch({ store }) {
    store.dispatch("users/loadUsers", { reset: true });
  },
  computed: {
    mainUsers() {
      return this.$store.state.users.mainUsers;
    },
    hasMoreUser() {
      return this.$store.state.users.hasMoreUser;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (this.hasMoreUser) {
          this.$store.dispatch("users/loadUsers");
        }
      }
    },
  },
}
</script>

<style scoped></style>
