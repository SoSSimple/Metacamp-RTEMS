<template>
  <div>
    <b-modal id="modal-order-inform" title="장비 상태 수정" @ok="onSubmit">
      <div class="d-block text-center">
        <div v-if="inputMode === 'update'">
          <b-form-group>
            <h4>가동/비가동 상태로 바꾸기</h4>
            <b-form-select v-model="selectedDevice">
              <option v-for="(o, idx) in deviceList" v-bind:key="idx">
                {{ o.deviceName }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="radio-group-1"
              v-model="selectedOperating"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radio-options"
            ></b-form-radio-group>
          </b-form-group>
        </div>

        <div v-else-if="inputMode === 'complete'">
          <b-form-group>
            <h4>작업 완료 시키기</h4>
            <b-form-select v-model="selectedDevice">
              <option v-for="(o, idx) in deviceList" v-bind:key="idx">
                {{ o.deviceName }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group>
            <b-form-input
              style="margin: 5px"
              v-model="total"
              placeholder="공정 개수"
            ></b-form-input>
            <b-form-input
              style="margin: 5px"
              v-model="failedCount"
              placeholder="실패 개수"
            ></b-form-input>
            <b-form-textarea
              style="margin: 5px"
              id="textarea"
              v-model="description"
              placeholder="비고 적기"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </div>

        <div v-else>
          <b-form-group>
            <h4>비상정지 시키기</h4>
            <b-form-select v-model="selectedDevice">
              <option v-for="(o, idx) in deviceList" v-bind:key="idx">
                {{ o.deviceName }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="radio-group-1"
              v-model="selectedOperating"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radio-options"
            ></b-form-radio-group>
          </b-form-group>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      returnSelected: null,
      options: [
        { text: "On", value: "on" },
        { text: "Off", value: "off" },
      ],
      selectedOperating: false,
      selectedDevice: false,
      total: null,
      failedCount: null,
      description: null,
    };
  },
  computed: {
    deviceList() {
      return this.$store.getters.DeviceList;
    },
    me() {
      return this.$store.getters.me;
    },
    inputMode() {
      return this.$store.getters.DeviceInputMode;
    },
    getTitle() {
      let title = "";
      if (this.inputMode === "update") {
        title = "가동 상태";
      } else if (this.inputMode === "complete") {
        title = "가동 완료";
      } else {
        title = "비상정지";
      }
      return title;
    },
  },
  created() {
    this.searchDeviceList();
  },
  methods: {
    searchDeviceList() {
      this.$store.dispatch("actDeviceList");
    },
    onSubmit() {
      // 1. 가동 수정인 경우
      if (this.inputMode === "update") {
        if (this.selectedOperating == "on") {
          this.returnSelected = true;
          const payload = {
            operatingState: this.returnSelected,
            deviceName: this.selectedDevice,
            userId: this.me.userId,
          };
          this.$store.dispatch("actDeviceOperating", payload);
        } else {
          this.returnSelected = false;
          const payload = {
            operatingState: this.returnSelected,
            deviceName: this.selectedDevice,
            userId: this.me.userId,
          };
          this.$store.dispatch("actDeviceOperating", payload);
        }
      }

      // 2. 가동 완료인 경우
      if (this.inputMode === "complete") {
        const payload = {
          deviceName: this.selectedDevice,
          userId: this.me.userId,
          total: this.total,
          failedCount: this.failedCount,
          description: this.description,
        };
        console.log(payload);
        this.$store.dispatch("actDeviceComplete", payload);
      }

      // 3. 비상정지인 경우
      // if (this.inputMode === "pause") {
      //   if (this.selectedOperating == "on") {
      //     this.returnSelected = true;
      //     const payload = {
      //       operatingState: this.returnSelected,
      //       deviceName: this.selectedDevice,
      //       userId: this.me.userId,
      //     };
      //     this.$store.dispatch("actDeviceOperating", payload);
      //   } else {
      //     this.returnSelected = false;
      //     const payload = {
      //       operatingState: this.returnSelected,
      //       deviceName: this.selectedDevice,
      //       userId: this.me.userId,
      //     };
      //     this.$store.dispatch("actDeviceOperating", payload);
      //   }
      // }
    },
  },
};
</script>
