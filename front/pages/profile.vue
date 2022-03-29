<template>
  <v-container :style="{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}">
    <v-card :style="{ width: '500px'}">
      <v-container>
        <v-subheader>마이페이지</v-subheader>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-container>
            <v-text-field
              v-model="userId"
              :value="`${me.data.data.userId}`"
              label="아이디"
              type="email"
              :rules="userIdRules"
              required
            />
            <!-- <input type="text" :value="`${me.data.data.userId}`"> -->
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              required
            />
            <v-text-field
              v-model="name"
              label="이름"
              :rules="nameRules"
              required
            />
            <v-select
              :items="department"
              label="부서"
              :rules="departmentRules"
              required
            />
            <v-select
              :items="role"
              label="역할"
              :rules="roleRules"
              required
            />
            <v-container :style="{ display: 'flex', justifyContent:'flex-end'}">
              <v-btn type="submit">수정</v-btn>
            </v-container>
            <v-container />
          </v-container>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    middleware: 'authenticated',
    data() {
      return {
        valid: false,
        userId: '',
        password: '',
        name: '',
        department: ['dev','sales'],
        role: ['worker','admin'],
        userIdRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
        nameRules: [
          v => !!v || '이름은 필수입니다.',
        ],
        departmentRules: [
          v => !!v || '부서선택은 필수입니다.',
        ],
        roleRules: [
          v => !!v || '역할선택은 필수입니다.',
        ],
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          // actions dispatch
          this.$store.dispatch('users/signUp', {
            name: this.name,
            userId: this.userId,
            password: this.password,
            department: this.department,
            role: this.role,
          })
          .then(() => {
            console.log('회원가입 성공');
          })
          .catch(() => {
            alert('회원가입 실패')
          })  
        } 
      }
    },
  };
</script>

<style>

</style>
