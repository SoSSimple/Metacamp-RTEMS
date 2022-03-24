<template>
  <v-container>
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            v-model="userId"
            label="이메일"
            require
          />
          
          <v-text-field
            v-model="password"
            label="비밀번호"
            type="password"
            require
          />
          <v-btn color="green" type="submit">로그인</v-btn>
          <v-btn next to="/signup">회원가입</v-btn>
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
        password: ''
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me
      }
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/login', {
            userId: this.userId,
            password: this.password
          })
          // console.log(this.userId, this.password)
        } else {
          alert('폼이 유효하지 않습니다.');
        }
      } 
    }
  }

</script>
<style scoped>

</style>