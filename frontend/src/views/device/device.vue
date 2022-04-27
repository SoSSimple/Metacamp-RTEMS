<template>
  <div>
    <div>
      <b-col>
        <div class="table_header">
          <h1>장비관리</h1>
        </div>
        <b-row>
          <b-col style="text-align: right; margin-right: 120px">
            <b-button variant="success" size="sm" @click="onCreateDeviceList"
              >신규등록</b-button
            >
          </b-col>
        </b-row>
        <div>
          <div class="table_section">
            <table>
              <thead>
                <tr>
                  <th>장비번호</th>
                  <th>장비이름</th>
                  <th>준비상태</th>
                  <th>동작상태</th>
                  <th>시작시간</th>
                  <th>수정</th>
                  <!-- <th>삭제</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="device in deviceList" :key="device">
                  <td>{{ device.id }}</td>
                  <td>{{ device.deviceName }}</td>
                  <td>{{ device.readyState }}</td>
                  <td>{{ device.operatingState }}</td>
                  <td>{{ device.startedAt }}</td>
                  <td>
                    <b-button
                      size="sm"
                      variant="success"
                      @click="onClickEdit(device)"
                      >수정</b-button
                    >
                  </td>
                  <!-- <td>
                      <b-button
                        size="sm"
                        variant="danger"
                        @click="onClickDelete(user)"
                        >삭제</b-button
                      >
                    </td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <b-table small hover striped :items="deviceList" :fields="fields">
              <template #cell(updatedBtn)="row">
                <b-button
                  size="sm"
                  variant="success"
                  @click="onClickEdit(row.item.id)"
                  >수정</b-button
                >
              </template>
            </b-table> -->
        </div>
      </b-col>
    </div>
    <EditInform :deviceData="clickDeviceData" />
    <InsertForm @addDevice="searchDeviceList()" />
  </div>
</template>

<script>
import EditForm from "./editForm.vue";
import InsertForm from "./insertForm.vue";

export default {
  components: {
    EditInform: EditForm,
    InsertForm: InsertForm,
  },
  data() {
    return {
      clickDeviceData: {},
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
    onClickEdit(deviceData) {
      console.log(deviceData);
      this.clickDeviceData = deviceData;
      this.$bvModal.show("modal-device-edit-inform");
    },
    onCreateDeviceList() {
      this.$bvModal.show("modal-device-insert-inform");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

.table {
  width: 100%;
}

.table_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  background-color: rgb(240, 240, 240);
}

.table_header p {
  color: #000000;
}

button {
  outline: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 10px;
  color: #ffffff;
}

td button:nth-child(1) {
  background-color: #1b1b1b;
}

td button:nth-child(2) {
  background-color: #f80000;
}

.add_new {
  padding: 10px 20px;
  color: #ffffff;
  background-color: #1b1b1b;
}

input {
  padding: 10px 20px;
  margin: 0 10px;
  outline: none;
  border: 1px solid #1b1b1b;
  border-radius: 6px;
  color: #1b1b1b;
}

.table_section {
  height: 500px;
  overflow: auto;
}

table {
  width: 100%;
  table-layout: fixed;
  min-width: 900px;
  border-collapse: collapse;
}

thead th {
  position: sticky;
  top: 0;
  background-color: #f6f9fc;
  color: #8493a5;
  font-size: 15px;
}

th,
td {
  border-bottom: 1px solid #dddddd;
  padding: 10px 20px;
  word-break: break-all;
  text-align: center;
}

td img {
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: 15px;
  border: 5px solid #ced0d2;
}

tr:hover td {
  color: #1b1b1b;
  cursor: pointer;
  background-color: #f6f9fc;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 20px;
}

.pagination div {
  padding: 10px;
  border: 2px solid #d5d0d0;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b1b1b;
  color: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  margin: 0 5px;
  cursor: pointer;
}

::placeholder {
  color: #1b1b1b;
}

::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
