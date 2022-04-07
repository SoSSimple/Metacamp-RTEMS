<template>
  <div>
    <b-modal
      id="modal-device-edit-inform"
      title="준비상태 바꾸기"
      @ok="onSubmit"
    >
      <template #modal-title> 운영상태 바꾸기</template>
      <p>장비명과 준비상태를 선택하시오.</p>
      <b-form-group>
        <b-form-select v-model="selectedDevice">
          <option v-for="(o, idx) in deviceList" v-bind:key="idx">
            {{ o.deviceName }}
          </option>
        </b-form-select>
      </b-form-group>
      <b-form-group v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          id="radio-group-1"
          v-model="selectedReady"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="radio-options"
        ></b-form-radio-group>
      </b-form-group>
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
      selectedReady: false,
      selectedDevice: false,
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
    onSubmit() {
      if (this.selectedReady == "on") {
        this.returnSelected = true;
        const payload = {
          readyState: this.returnSelected,
          deviceName: this.selectedDevice,
        };
        this.$store.dispatch("actDeviceReady", payload);
      } else {
        this.returnSelected = false;
        const payload = {
          readyState: this.returnSelected,
          deviceName: this.selectedDevice,
        };
        this.$store.dispatch("actDeviceReady", payload);
      }
    },
  },
};
</script>
