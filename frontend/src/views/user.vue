<template>
  <div>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col cols="2">
          <app-sidebar />
        </b-col>
        <b-col>
          <b-row style="margin-right: 8px">
            <b-col style="text-align: left; margin-bottom: 10px"
              ><b-button variant="primary" size="sm" @click="searchUserList"
                >검색</b-button
              ></b-col
            >
            <b-col style="text-align: right; margin-bottom: 10px"
              ><b-button variant="success" size="sm">신규등록</b-button></b-col
            >
          </b-row>
          <div style="margin-right: 22px">
            <b-table
              small
              hover
              striped
              :items="userList"
              :fields="fields"
            ></b-table>
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
  data() {
    return {
      fields: [
        { key: "userId", label: "아이디" },
        { key: "name", label: "이름" },
        { key: "email", label: "이메일" },
        { key: "role", label: "권한" },
        { key: "department", label: "부서" },
      ],
    };
  },
  computed: {
    userList() {
      return this.$store.getters.UserList;
    },
  },
  created() {
    this.searchUserList();
  },
  methods: {
    searchUserList() {
      this.$store.dispatch("actUserList");
    },
  },
};
</script>
