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
              ><b-button variant="primary" size="sm" @click="searchDeviceList"
                >검색</b-button
              ></b-col
            >
            <b-col style="text-align: right; margin-bottom: 10px"
              ><b-button variant="success" size="sm">신규등록</b-button></b-col
            >
          </b-row>
          <div style="margin-right: 22px">
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
        </b-col>
      </b-row>
    </div>
    <inform />
  </div>
</template>

<script>
import Sidebar from "../components/layout/Sidebar.vue";
import DeviceInform from "./deviceInform.vue";

export default {
  components: {
    "app-sidebar": Sidebar,
    inform: DeviceInform,
  },
  data() {
    return {
      fields: [
        { key: "id", label: "장비 고유번호" },
        { key: "deviceName", label: "장비명" },
        { key: "readyState", label: "준비 상태" },
        { key: "operatingState", label: "가동 상태" },
        { key: "startedAt", label: "가동 시작 시간" },
        { key: "updatedBtn", label: "준비상태 수정" },
      ],
    };
  },
  computed: {
    deviceList() {
      return this.$store.getters.DeviceList;
    },
  },
  created() {
    this.searchDeviceList();
  },
  methods: {
    searchDeviceList() {
      this.$store.dispatch("actDeviceList");
    },
    onClickEdit() {
      // this.$store.dispatch("actDepartmentInputMode", "update");

      // 2. 상세정보 호출
      // this.$store.dispatch("actDepartmentInfo", id);

      // 3. 모달 출력
      this.$bvModal.show("modal-device-inform");
    },
  },
};
</script>
