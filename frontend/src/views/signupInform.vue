<template>
  <div>
    <b-modal id="modal-signup-inform" title="회원가입" @ok="onSubmit">
      <div>
        <b-form-group>
          <b-form-input
            placeholder="아이디 입력"
            v-model="userId"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            placeholder="패스워드 입력"
            v-model="password"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            placeholder="패스워드 확인"
            v-model="checkPassword"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="email"
            placeholder="이메일 입력"
            v-model="email"
          ></b-form-input>
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
      email: null,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.userId, this.password, this.checkPassword, this.email);
    },
  },
};
</script>

<style lang="scss" scoped></style>
