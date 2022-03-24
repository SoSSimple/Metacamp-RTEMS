<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field
              v-model="email"
              label="아이디"
              type="email"
              :rules="emailRules"
              required
            />
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              required
            />
            <v-select
              :items="items"
              label="부서"
              dense
            />
            <v-select
              :items="roles"
              label="역할"
              dense
            />
            <v-btn color="green" type="submit">가입하기</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: ['dev','sales'],
        roles: ['worker','admin'],
        valid: false,
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
        terms: false,
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        nicknameRules: [
          v => !!v || '닉네임은 필수입니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
        passwordCheckRules: [
          v => !!v || '비밀번호 확인은 필수입니다.',
          v => v === this.password || '비밀번호가 일치하지 않습니다.',
        ],
      };
    },
    head() {
      return {
        title: '회원가입',
      };
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          alert('회원가입 시도!');
        } else {
          alert('폼이 유효하지 않습니다.');
        }
      }
    },
  };
</script>

<style>

</style>
