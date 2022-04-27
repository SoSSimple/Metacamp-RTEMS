<template>
  <div>
    <div style="margin-bottom: 5px; width: 100%">
      <b-row>
        <div>
          <b-col>
            <div class="table_header">
              <h1>작업지시서</h1>
            </div>
            <div class="button-wrapper">
              <button size="sm" variant="success" @click="onClickEdit(device)">
                가동
              </button>
              <button
                size="sm"
                variant="success"
                @click="onClickComplete(device)"
              >
                완료
              </button>
              <button size="sm" variant="danger" @click="onClickDelete(user)">
                비상정지
              </button>
            </div>
            <div>
              <div class="table_section">
                <table>
                  <thead>
                    <tr>
                      <th>장비명</th>
                      <th>준비상태</th>
                      <th>동작상태</th>
                      <th>가동시작시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="device in deviceList" :key="device">
                      <td>{{ device.deviceName }}</td>
                      <td>{{ device.readyState }}</td>
                      <td>{{ device.operatingState }}</td>
                      <td>{{ device.startedAt }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-col>
        </div>
      </b-row>
    </div>
    <OrderInform />
  </div>
</template>

<script>
import OrderInform from "./orderInform.vue";
import mqtt from "mqtt";

export default {
  components: {
    OrderInform: OrderInform,
  },
  data() {
    return {
      subscription: {
        topic: "UVC-EDU-01",
        qos: 0,
      },
      mqttData: "",
      client: {
        connected: false,
      },
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
    this.createConnection();
    this.searchDeviceList();
    this.searchEdgeOneLogList();
    this.searchEdgeTwoLogList();
    this.searchEdgeThreeLogList();
  },

  methods: {
    createConnection() {
      const connectUrl = process.env.VUE_APP_MQTT;

      try {
        this.client = mqtt.connect(connectUrl);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }

      this.client.on("connect", () => {
        const topic = "UVC-EDU-01";
        this.client.subscribe(topic, {}, (error) => {
          if (error) {
            console.error("mqtt client", error);
          }
        });
        console.log("Connection succeeded!");
      });

      this.client.on("message", (topic, message) => {
        this.mqttData = JSON.parse(message);
        console.log(this.mqttData);
      });
    },
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
      this.$store.dispatch("actDeviceInputMode", "update");
      this.$bvModal.show("modal-order-inform");
    },
    onClickComplete() {
      this.$store.dispatch("actDeviceInputMode", "complete");
      this.$bvModal.show("modal-order-inform");
    },
    onClickPause() {
      this.$store.dispatch("actDeviceInputMode", "pause");
      this.$bvModal.show("modal-order-inform");
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

.button-wrapper {
  display: flex;
  justify-content: right;
}
.button-wrapper button {
  margin: 0px 20px;
  outline: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 10px;
  background-color: #1b1b1b;
}
</style>
