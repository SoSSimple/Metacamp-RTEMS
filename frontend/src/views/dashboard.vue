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
              ><b-button variant="success" size="sm">신규등록</b-button></b-col
            >
          </b-row>
          <div style="margin-right: 22px">
            <b-table
              small
              hover
              striped
              :items="departmentList"
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
        { key: "deviceLog", label: "작업이력" },
        { key: "createdAt", label: "생성일" },
      ],
    };
  },
};
</script>
