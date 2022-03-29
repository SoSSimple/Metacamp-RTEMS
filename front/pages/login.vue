<template>
  <v-container :style="{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}">
    <v-card :style="{ width: '500px'}">
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-subheader>로그인</v-subheader>
          <v-container>
            <v-text-field
              v-model="userId"
              label="아이디"
              :rules="userIdRules"
              require
            />
          
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              require
            />
            <v-container :style="{ display: 'flex', justifyContent:'flex-end'}">
              <v-btn :style="{ marginLeft: '10px'}" type="submit" :disabled="!valid">로그인</v-btn>
              <v-btn :style="{ marginLeft: '10px'}" next to="/signup">회원가입</v-btn>
            </v-container>
            <v-container />
          </v-container>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data(){
      return {
        valid: false,
        userId: '',
        password: '',
        userIdRules: [
          v => !!v || '아이디가 틀립니다',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호가 틀립니다',
        ],
      }
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/login', {
            userId: this.userId,
            password: this.password,
          })
            .then(() => {
             console.log('로그인 성공');
            })
            .catch((err) => {
              alert('로그인 실패')
            })        
        }
      } 
    },
    middleware: 'anonymous',
  }

</script>
<style scoped>

</style>