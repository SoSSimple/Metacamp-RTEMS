<template>
  <div>
    <div style="margin-bottom: 5px; width: 100%">
      <b-row>
        <b-col>
          <div>
            <h2>모든 장비 목록 {{ mqttData }}</h2>
            <b-table small hover striped :items="deviceList" :fields="fields">
              <template #cell(updatedBtn)="row">
                <b-button
                  size="sm"
                  variant="outline-primary"
                  @click="onClickEdit(row.item.id)"
                  >수정</b-button
                >
              </template>
              <template #cell(completedBtn)="row">
                <b-button
                  size="sm"
                  variant="success"
                  @click="onClickComplete(row.item.id)"
                  >완료</b-button
                >
              </template>
              <template #cell(pausedBtn)="row">
                <b-button
                  size="sm"
                  variant="danger"
                  @click="onClickPause(row.item.id)"
                  >정지</b-button
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
import OrderInform from "./orderInform.vue";
import mqtt from "mqtt";

export default {
  components: {
    inform: OrderInform,
  },
  data() {
    return {
      subscription: {
        topic: "UVC-EDU-01",
        qos: 0,
      },
      mqttData: "",
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,

      fields: [
        { key: "deviceName", label: "장비명" },
        { key: "readyState", label: "준비 상태" },
        { key: "operatingState", label: "가동 상태" },
        { key: "startedAt", label: "가동 시작 시간" },
        { key: "updatedBtn", label: "가동" },
        { key: "completedBtn", label: "완료" },
        { key: "pausedBtn", label: "비상정지" },
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
    this.createConnection();
    this.searchDeviceList();
    this.searchEdgeOneLogList();
    this.searchEdgeTwoLogList();
    this.searchEdgeThreeLogList();
  },

  methods: {
    createConnection() {
      // Connect string, and specify the connection method used through protocol
      // ws unencrypted WebSocket connection
      // wss encrypted WebSocket connection
      // mqtt unencrypted TCP connection
      // mqtts encrypted TCP connection
      // wxs WeChat mini app connection
      // alis Alipay mini app connection
      const connectUrl = process.env.VUE_APP_MQTT;

      console.log(connectUrl);
      try {
        this.client = mqtt.connect(connectUrl);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }
      // console.log(this.client.on);
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
