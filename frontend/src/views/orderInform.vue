<template>
  <div>
    <b-modal id="modal-order-inform" title="부서정보 입력" @ok="onSubmit">
      <template #modal-title> 가동상태 바꾸기 </template>
      <div class="d-block text-center">
        <h3>장비를 선택해서 가동상태를 바꾸시오</h3>
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
            v-model="selectedOperating"
            :options="options"
            :aria-describedby="ariaDescribedby"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>
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
    };
  },
  computed: {
    deviceList() {
      return this.$store.getters.DeviceList;
    },
    me() {
      return this.$store.getters.me;
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
    },
  },
};
</script>
