<template>
  <div>
    <b-modal id="modal-user-editForm" @ok="onSubmit">
      <div>
        <b-form-group label="사용자이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="userData.name"></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호" label-for="password" label-cols="3">
          <b-form-input id="password" v-model="password"></b-form-input>
        </b-form-group>
        <b-form-group label="권한" label-for="role" label-cols="3">
          <select v-model="userData.role">
            <option>admin</option>
            <option>worker</option>
          </select>
        </b-form-group>
        <b-form-group label="부서" label-for="department" label-cols="3">
          <select v-model="userData.department">
            <option>sales</option>
            <option>dev</option>
          </select>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: null,
    };
  },
  props: {
    userData: {
      type: Object,
      required: true,
      default: null,
    },
  },
  computed: {},
  methods: {
    onSubmit() {
      const payload = {
        name: this.userData.name,
        password: this.password,
        role: this.userData.role,
        department: this.userData.department,
        id: this.userData.id,
      };
      this.$store.dispatch("actUpdateUserList", payload);
    },
  },
};
</script>

<style scoped>
select-box {
  display: flex;
}
</style>
