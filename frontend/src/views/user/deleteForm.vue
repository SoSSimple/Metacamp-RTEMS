<template>
  <div>
    <b-modal id="modal-user-deleteForm" @ok="onSubmit">
      <div>
        <p>정말로 해당 유저를 삭제 하시겠습니까?</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      require: true,
      default: null,
    },
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("actDeleteUserList", this.userData);
    },
  },
};
</script>

<style></style>
