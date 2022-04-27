<template>
  <div>
    <b-modal
      id="modal-device-edit-inform"
      title="준비상태 바꾸기"
      @ok="onSubmit"
    >
      <div>
        <p>장비명과 준비상태를 선택하시오.</p>
        <b-form-group>
          <div>
            {{ deviceData.deviceName }}
          </div>
        </b-form-group>
        <b-form-radio-group
          id="radio-group-1"
          v-model="deviceData.readyState"
          :options="options"
          name="radio-options"
        ></b-form-radio-group>
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
        { text: "On", value: "true" },
        { text: "Off", value: "false" },
      ],
    };
  },
  props: {
    deviceData: {
      type: Object,
      required: true,
      default: null,
    },
  },

  methods: {
    onSubmit() {
      const payload = {
        id: this.deviceData.id,
        deviceName: this.deviceData.deviceName,
        operatingState: this.deviceData.operatingState,
        readyState: this.deviceData.readyState,
        startedAt: this.deviceData.startedAt,
      };
      this.$store.dispatch("actDeviceReady", payload);
    },
  },
};
</script>
