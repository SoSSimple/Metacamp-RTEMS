<template>
  <div>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col cols="2">
          <app-sidebar />
        </b-col>
        <b-col>
          <div style="margin-right: 22px">
            <hr />
            <h2>작업 결과 목록</h2>
            <b-table
              small
              hover
              striped
              :items="deviceResultList"
              :fields="fields"
            ></b-table>
          </div>
          <div style="margin-right: 22px">
            <hr />
            <h2>비상정지 목록</h2>
            <b-table small hover striped :fields="pausedFields"></b-table>
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
        { key: "userId", label: "작업자 아이디" },
        { key: "deviceName", label: "장비명" },
        { key: "total", label: "공정 개수" },
        { key: "failedCount", label: "실패 개수" },
        { key: "yield", label: "양품률" },
        { key: "startedAt", label: "작업시작시간" },
        { key: "endedAt", label: "작업완료시간" },
      ],
      pausedFields: [
        { key: "userId", label: "아이디" },
        { key: "deviceName", label: "장비명" },
        { key: "createdAt", label: "정지 시간" },
        { key: "description", label: "정지 이유" },
      ],
    };
  },
  computed: {
    deviceResultList() {
      return this.$store.getters.DeviceResultList;
    },
  },
  created() {
    this.searchDeviceResultList();
  },
  methods: {
    searchDeviceResultList() {
      this.$store.dispatch("actDeviceResult");
    },
  },
};
</script>
