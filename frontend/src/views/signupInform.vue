<template>
  <div>
    <b-modal id="modal-signup-inform" title="회원가입" @ok="onSubmit">
      <div class="d-block text-center">
        <b-form-group>
          <b-form-input
            placeholder="아이디 입력"
            v-model="userId"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            placeholder="이름 입력"
            v-model="name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            placeholder="패스워드 입력"
            v-model="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            placeholder="패스워드 확인"
            v-model="checkPassword"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            id="radio-group-1"
            v-model="selectedRole"
            :options="optionsRole"
            :aria-describedby="ariaDescribedby"
            name="radio-options1"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            id="radio-group-2"
            v-model="selectedDepartment"
            :options="optionsDepartment"
            :aria-describedby="ariaDescribedby"
            name="radio-options2"
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
      userId: null,
      password: null,
      checkPassword: null,
      name: null,
      selectedRole: null,
      selectedDepartment: null,
      optionsRole: [
        { text: "WORKER", value: "worker" },
        { text: "ADMIN", value: "admin" },
      ],
      optionsDepartment: [
        { text: "영업팀", value: "sales" },
        { text: "개발팀", value: "dev" },
      ],
    };
  },
  watch: {},
  methods: {
    onSubmit() {
      if (
        !this.name ||
        !this.userId ||
        !this.password ||
        !this.checkPassword ||
        !this.selectedRole ||
        !this.selectedDepartment
      ) {
        this.userId = "";
        this.name = "";
        this.password = "";
        this.checkPassword = "";
        this.selectedRole = null;
        this.selectedDepartment = null;
        alert("모든 내용은 필수로 입력해야 합니다.");
      }
      if (this.password != this.checkPassword) {
        this.userId = "";
        this.name = "";
        this.password = "";
        this.checkPassword = "";
        this.selectedRole = null;
        this.selectedDepartment = null;
        alert("비밀번호가 맞지 않습니다. 가입이 실패되었습니다.");
      }
      const payload = {
        userId: this.userId,
        password: this.password,
        name: this.name,
        role: this.selectedRole,
        department: this.selectedDepartment,
      };
      this.userId = "";
      this.name = "";
      this.password = "";
      this.checkPassword = "";
      this.selectedRole = null;
      this.selectedDepartment = null;
      alert("회원가입에 성공했습니다!!");

      this.$store.dispatch("actSignup", payload);
    },
  },
};
</script>

<style lang="scss" scoped></style>
