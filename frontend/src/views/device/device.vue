<template>
  <div>
    <div style="margin-bottom: 5px; width: 100%">
      <b-row>
        <b-col cols="2">
          <app-sidebar />
        </b-col>
        <b-col>
          <b-row>
            <b-col style="text-align: right; margin-bottom: 10px"
              ><b-button variant="success" size="sm" @click="onCreateDeviceList"
                >신규등록</b-button
              ></b-col
            >
          </b-row>
          <div>
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
    <EditInform />
    <InsertForm @addDevice="searchDeviceList()" />
  </div>
</template>

<script>
import Sidebar from "../../components/layout/Sidebar.vue";
import EditForm from "./editForm.vue";
import InsertForm from "./insertForm.vue";

export default {
  components: {
    "app-sidebar": Sidebar,
    EditInform: EditForm,
    InsertForm: InsertForm,
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
      this.$bvModal.show("modal-device-edit-inform");
    },
    onCreateDeviceList() {
      this.$bvModal.show("modal-device-insert-inform");
    },
  },
};
</script>

<style scoped>
.col {
  margin-top: 60px;
}
</style>
