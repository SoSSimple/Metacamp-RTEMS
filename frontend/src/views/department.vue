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
              ><b-button
                variant="primary"
                size="sm"
                @click="searchDepartmentList"
                >검색</b-button
              ></b-col
            >
            <b-col style="text-align: right; margin-bottom: 10px"
              ><b-button variant="success" size="sm" @click="onClickAddNew"
                >신규등록</b-button
              ></b-col
            >
          </b-row>
          <div style="margin-right: 22px">
            <b-table
              small
              hover
              striped
              :items="departmentList"
              :fields="fields"
            >
              <template #cell(createdAt)="row">
                {{ row.item.createdAt.substring(0, 10) }}
              </template>
              <template #cell(updateBtn)="row">
                <b-button
                  size="sm"
                  variant="success"
                  @click="onClickEdit(row.item.id)"
                  >수정</b-button
                >
              </template>
              <template #cell(deleteBtn)="row">
                <b-button
                  size="sm"
                  variant="danger"
                  @click="onClickDelete(row.item.id)"
                  >삭제</b-button
                >
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </div>
    <inform />
  </div>
</template>

<script>
import Sidebar from "../components/layout/Sidebar.vue";
import inform from "./inform.vue";

export default {
  components: {
    "app-sidebar": Sidebar,
    inform: inform,
  },
  data() {
    return {
      fields: [
        { key: "id", label: "id" },
        { key: "name", label: "부서명" },
        { key: "code", label: "부서코드" },
        { key: "description", label: "상세설명" },
        { key: "updateBtn", label: "수정" },
        { key: "deleteBtn", label: "삭제" },
      ],
    };
  },
  computed: {
    departmentList() {
      return this.$store.getters.DepartmentList;
    },
    insertedResult() {
      return this.$store.getters.DepartmentInsertedResult;
    },
  },
  watch: {
    insertedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast("등록 되었습니다.", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
          });

          this.searchDepartmentList();
        } else {
          this.$bvToast.toast("등록이 실패하였습니다.", {
            title: "ERROR",
            variant: "danger",
            solid: true,
          });
        }
      }
    },
  },
  created() {
    this.searchDepartmentList();
  },
  methods: {
    searchDepartmentList() {
      this.$store.dispatch("actDepartmentList");
    },
    onClickAddNew() {
      this.$store.dispatch("actDepartmentInputMode", "insert");

      this.$bvModal.show("modal-department-inform");
    },
    onClickEdit(id) {
      // 1. 입력모드 설정
      this.$store.dispatch("actDepartmentInputMode", "update");

      // 2. 상세정보 호출
      this.$store.dispatch("actDepartmentInfo", id);

      // 3. 모달 출력
      this.$bvModal.show("modal-department-inform");
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm("삭제 하시겠습니까?").then((value) => {
        if (value) {
          this.$store.dispatch("actDepartmentDelete", id);
        }
      });
    },
  },
};
</script>
