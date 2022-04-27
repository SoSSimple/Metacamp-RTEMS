<template>
  <div>
    <b-modal id="modal-user-editForm" @ok="onSubmit">
      <div id="user-edit-wrapper">
        <b-form-group label="사용자이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="userData.name"></b-form-input>
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
      let checkEdit = confirm("수정하시겠습니까?");
      const payload = {
        name: this.userData.name,
        password: this.password,
        role: this.userData.role,
        department: this.userData.department,
        id: this.userData.id,
      };
      if (checkEdit) {
        this.$store.dispatch("actUpdateUserList", payload);
      }
    },
  },
};
</script>

<style scoped>
.modal-body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
#user-edit-wrapper {
  padding: 40px;
}

#user-edit-wrapper div {
  margin-bottom: 50px;
}
</style>
