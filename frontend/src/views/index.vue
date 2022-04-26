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

      this.$store.dispatch("actUserLogin", payload);

      this.form.id = "";
      this.form.password = "";
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
</style>
