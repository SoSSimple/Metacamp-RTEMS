<template>
  <div>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col cols="2">
          <app-sidebar />
        </b-col>
        <b-col>
          <div style="margin-right: 22px">
            <h2>모든 장비 목록</h2>
            <b-table small hover striped :items="deviceList" :fields="fields">
              <template #cell(updatedBtn)="row">
                <b-button
                  size="sm"
                  variant="success"
                  @click="onClickEdit(row.item.id)"
                  >수정</b-button
                >
              </template>
            </b-table>
          </div>
          <br />
          <div>
            <hr />
            <h2>장비 사용 기록</h2>
            <br />
            <div>
              <h4>Edge-1 기록</h4>
              <b-table
                small
                hover
                striped
                :items="edgeOneLogList"
                :fields="edgeFields"
              >
              </b-table>
            </div>
            <div>
              <h4>Edge-2 기록</h4>
              <b-table
                small
                hover
                striped
                :items="edgeTwoLogList"
                :fields="edgeFields"
              >
              </b-table>
            </div>
            <div>
              <h4>Edge-3 기록</h4>
              <b-table
                small
                hover
                striped
                :items="edgeThreeLogList"
                :fields="edgeFields"
              >
              </b-table>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <inform />
  </div>
</template>

<script>
import Sidebar from "../components/layout/Sidebar.vue";
import OrderInform from "./orderInform.vue";

export default {
  components: {
    "app-sidebar": Sidebar,
    inform: OrderInform,
  },
  data() {
    return {
      fields: [
        { key: "deviceName", label: "장비명" },
        { key: "readyState", label: "준비 상태" },
        { key: "operatingState", label: "가동 상태" },
        { key: "startedAt", label: "가동 시작 시간" },
        { key: "updatedBtn", label: "가동 수정" },
      ],
      edgeFields: [
        { key: "name", label: "작업자 이름" },
        { key: "userId", label: "작업자 아이디" },
        { key: "department", label: "부서" },
        { key: "role", label: "권한" },
      ],
    };
  },
  computed: {
    deviceList() {
      return this.$store.getters.DeviceList;
    },
    edgeOneLogList() {
      return this.$store.getters.EdgeOneLogs;
    },
    edgeTwoLogList() {
      return this.$store.getters.EdgeTwoLogs;
    },
    edgeThreeLogList() {
      return this.$store.getters.EdgeThreeLogs;
    },
  },
  created() {
    this.searchDeviceList();
    this.searchEdgeOneLogList();
    this.searchEdgeTwoLogList();
    this.searchEdgeThreeLogList();
  },
  methods: {
    searchDeviceList() {
      this.$store.dispatch("actDeviceList");
    },
    searchEdgeOneLogList() {
      this.$store.dispatch("actEdgeOneLogs");
    },
    searchEdgeTwoLogList() {
      this.$store.dispatch("actEdgeTwoLogs");
    },
    searchEdgeThreeLogList() {
      this.$store.dispatch("actEdgeThreeLogs");
    },
    onClickEdit() {
      this.$bvModal.show("modal-order-inform");
    },
  },
};
</script>
