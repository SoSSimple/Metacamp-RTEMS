<template>
  <b-container>
    <h1>login</h1>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group class="userId" id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.id"
            placeholder="아이디 입력"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          class="userPassword"
          id="input-group-2"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="패스워드 입력"
            type="password"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button @click="onSubmitSignup">signup</b-button>
      </b-form>
    </div>
    <inform />
  </b-container>
</template>

<script>
import SignupInform from "./user/signupInform.vue";

export default {
  components: {
    inform: SignupInform,
  },
  data() {
    return {
      form: {
        id: "",
        password: "",
      },
      user: "",
    };
  },
  computed: {
    me() {
      return this.$store.getters.me;
    },
  },
  created() {
    this.searchUserSession();
  },
  methods: {
    searchUserSession() {
      if (sessionStorage.length > 0) {
        this.valid = false;
      } else {
        this.valid = false;
      }
    },
    onSubmit(event) {
      event.preventDefault();
      this.$route.meta.header = true;
      const payload = {
        userId: this.form.id,
        password: this.form.password,
      };
      // const idValidation = /^[a-z]+[a-z0-9]{5,19}$/g; // 영문자로 시작하는 영문자 또는 숫자 6~20자
      // const passwordValidation = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; //8 ~ 16자 영문, 숫자 조합
      //
      // if (!idValidation.test(payload.userId)) {
      //   alert("아이디가 조건에 맞지 않습니다");
      //   return;
      // }
      //
      // console.log(passwordValidation.test(payload.password));
      // if (!passwordValidation.test(payload.password)) {
      //   alert("8 ~ 16자 영문, 숫자 조합");
      //   return;
      // }

      this.$store.dispatch("actUserLogin", payload);
    },
    onSubmitSignup() {
      this.$bvModal.show("modal-signup-inform");
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  width: 50px;
}

.container form {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.btn-primary {
  margin-bottom: 5px;
}

.col {
  margin: 60px 1%;
}

@media (max-width: 1700px) {
  .col {
    margin: 0 0 0 50px;
  }
}

@media (max-width: 1580px) {
  .col {
    margin: 0 0 0 100px;
  }
}

@media (max-width: 1280px) {
  .col {
    margin: 0 0 0 150px;
  }
}

@media (max-width: 1000px) {
  .col {
    margin: 0 0 0 200px;
  }
}

@media (max-width: 820px) {
  .col {
    margin: 50px 50%;
  }
}

@media (max-width: 600px) {
  .col {
    margin: 50px 60%;
  }
}
@media (max-width: 400px) {
  .col {
    margin: 50px 70%;
  }
}

@media (max-width: 300px) {
  .col {
    margin: 50px 95%;
  }
}
</style>
