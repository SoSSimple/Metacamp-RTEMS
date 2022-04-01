<template>
  <div>
    <b-modal id="modal-order-inform" title="부서정보 입력" @ok="onSubmit">
      <div>hello</div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: {
        id: null,
        name: null,
        code: null,
        description: null,
      },
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      console.log("submit");
      // 1. 등록인 경우
      // if (this.inputMode === "insert") {
      //   this.$store.dispatch("actDepartmentInsert", this.department); // 부서입력 실행
      // }

      // 2. 수정인 경우
      // if (this.inputMode === "update") {
      //   this.$store.dispatch("actDepartmentUpdate", this.department); // 부서수정 실행
      // }
    },
  },
};
</script>
