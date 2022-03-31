<template>
  <div v-if="valid">
    <b-container fluid style="padding-left: 0px">
      <b-row>
        <b-col
          cols="2"
          style="padding-right: 0px; margin-left: 8px; margin-right: 8px"
        >
          <app-sidebar />
        </b-col>
        <b-col style="padding-left: 0px; padding-right: 0px">
          <div class="content-body">
            <router-view />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>

  <b-container v-else>
    <h1>login</h1>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.id"
            placeholder="아이디 입력"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="패스워드 입력"
            type="password"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" style="margin: 5px"
          >Submit</b-button
        >
      </b-form>
    </div>
  </b-container>
</template>

<script>
import Sidebar from "../components/layout/Sidebar.vue";

export default {
  components: {
    "app-sidebar": Sidebar,
  },
  data() {
    return {
      valid: false,
      form: {
        id: "",
        password: "",
      },
    };
  },
  computed: {
    me() {
      return this.$store.getters.me;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const payload = {
        userId: this.form.id,
        password: this.form.password,
      };
      this.$store.dispatch("actUser", payload);
      if (this.me !== null) {
        alert("로그인 성공");
        this.valid = true;
      }
    },
  },
};
</script>
