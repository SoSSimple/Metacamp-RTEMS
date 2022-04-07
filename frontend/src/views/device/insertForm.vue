<template>
  <div>
    <b-modal id="modal-device-insert-inform" title="장비 추가" @ok="onSubmit">
      <template #modal-title> 장비 추가</template>
      <p>장비 고유번호 장비명 가동상태를 넣어주세요</p>
      <b-form-group>
        <b-form-input
          placeholder="장비명 입력"
          v-model="deviceName"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group v-slot="{ ariaDescribedby }">
        <p>준비상태</p>
        <b-form-radio-group
          id="radio-group-1"
          v-model="readyState"
          :options="ready"
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
      returnSelected: false,
      ready: [
        { text: "On", value: true },
        { text: "Off", value: false },
      ],
      operate: [
        { text: "On", value: true },
        { text: "Off", value: false },
      ],
      readyState: false,
      deviceName: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.readyState === "on") {
        this.returnSelected = true;
        const payload = {
          readyState: this.readyState,
          deviceName: this.deviceName,
        };
        this.$store.dispatch("actDeviceReady", payload);
      } else {
        this.returnSelected = false;
        const payload = {
          readyState: this.readyState,
          deviceName: this.deviceName,
        };
        this.$store.dispatch("actDeviceInsert", payload);
      }
    },
  },
};
</script>
