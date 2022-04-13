<template>
  <div>
    <div style="margin-bottom: 5px; width: 100%">
      <b-row>
        <b-col cols="2">
          <app-sidebar />
        </b-col>
        <b-col>
          <div>
            <b-table small hover striped :items="userList" :fields="fields">
              <template #cell(updateBtn)="row">
                <b-button
                  size="sm"
                  variant="success"
                  @click="onClickEdit(row.item)"
                  >수정</b-button
                >
              </template>
              <template #cell(deleteBtn)="row">
                <b-button
                  size="sm"
                  variant="danger"
                  @click="onClickDelete(row.item)"
                  >삭제</b-button
                >
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </div>
    <editForm :userData="clickUserData" />
    <deleteForm :userData="clickUserData" />
  </div>
</template>

<script>
import Sidebar from "../../components/layout/Sidebar.vue";
import editForm from "./editForm.vue";
import deleteForm from "./deleteForm.vue";

export default {
  components: {
    "app-sidebar": Sidebar,
    editForm: editForm,
    deleteForm: deleteForm,
  },
  data() {
    return {
      fields: [
        { key: "userId", label: "아이디" },
        { key: "name", label: "이름" },
        { key: "role", label: "권한" },
        { key: "department", label: "부서" },
        { key: "updateBtn", label: "수정" },
        { key: "deleteBtn", label: "삭제" },
      ],
      clickUserData: {},
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
  watch: {
    $route: "searchUserList",
  },
  methods: {
    searchUserList() {
      this.$store.dispatch("actUserList");
    },
    onClickEdit(userData) {
      this.clickUserData = userData;
      this.$bvModal.show("modal-user-editForm");
    },
    onClickDelete(userData) {
      this.clickUserData = userData;
      this.$bvModal.show("modal-user-deleteForm");
    },
  },
};
</script>
