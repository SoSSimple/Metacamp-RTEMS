<template>
  <div>
    <b-modal id="modal-signup-inform" title="회원가입" @ok="onSubmit">
      <div class="d-block text-center">
        <b-form-group>
          <b-form-input
            placeholder="아이디 입력"
            v-model="userId"
            required
            @keyup="validationCheck"
          ></b-form-input>
          <p class="show-id-error">
            {{ this.showIdError }}
          </p>
        </b-form-group>
        <b-form-group>
          <b-form-input
            placeholder="이름 입력"
            v-model="name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            placeholder="패스워드 입력"
            v-model="password"
            required
            @keyup="validationCheck"
          ></b-form-input>
          <p class="show-password-error1">
            {{ this.showPasswordError }}
          </p>
          <p class="show-password-confirm-error1">
            {{ this.showPasswordNotEquelError }}
          </p>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            placeholder="패스워드 확인"
            v-model="checkPassword"
            required
            @keyup="validationCheck"
          ></b-form-input>
          <p class="show-password-error2">
            {{ this.showPasswordError }}
          </p>
          <p class="show-password-confirm-error2">
            {{ this.showPasswordNotEquelError }}
          </p>
        </b-form-group>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            id="radio-group-1"
            v-model="selectedRole"
            :options="optionsRole"
            :aria-describedby="ariaDescribedby"
            name="radio-options1"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            id="radio-group-2"
            v-model="selectedDepartment"
            :options="optionsDepartment"
            :aria-describedby="ariaDescribedby"
            name="radio-options2"
          ></b-form-radio-group>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
const showAlert = (error) => {
  alert(error);
};

const showUserValidationError = (showCssChange) => {
  showCssChange.style.display = "flex";
};

const hideUserValidationError = (showCssChange) => {
  showCssChange.style.display = "none";
};
export default {
  data() {
    return {
      userId: "",
      password: "",
      checkPassword: "",
      name: "",
      allPassed: false,
      selectedRole: "",
      selectedDepartment: "",
      idValidation: "",
      passwordValidation: "",
      showPasswordNotEquelValidation: "",
      showIdError: "6~20 영문 혹은 영문+숫자만 가능합니다",
      showPasswordError: "8글자이상 영문+숫자만 가능합니다",
      showPasswordNotEquelError: "비밀번호와 비밀번호 확인은 같아야 합니다",
      validationChecked: "false",
      optionsRole: [
        { text: "WORKER", value: "worker" },
        { text: "ADMIN", value: "admin" },
      ],
      optionsDepartment: [
        { text: "sales", value: "sales" },
        { text: "dev", value: "dev" },
      ],
    };
  },
  watch: {},
  methods: {
    validationCheck() {
      const idValidation = /^[a-z]+[a-z0-9]{5,19}$/g; // 영문자로 시작하는 영문자 또는 숫자 6~20자
      const passwordValidation = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/; //8 ~ 16자 영문, 숫자 조합

      const showIdError = document.querySelector(".show-id-error");
      const showPasswordError1 = document.querySelector(
        ".show-password-error1"
      );
      const showPasswordError2 = document.querySelector(
        ".show-password-error2"
      );
      const showPasswordConfirmError1 = document.querySelector(
        ".show-password-confirm-error1"
      );
      const showPasswordConfirmError2 = document.querySelector(
        ".show-password-confirm-error2"
      );

      if (!idValidation.test(this.userId)) {
        showUserValidationError(showIdError);
      } else {
        hideUserValidationError(showIdError);
      }

      if (!passwordValidation.test(this.password)) {
        showUserValidationError(showPasswordError1);
      } else {
        hideUserValidationError(showPasswordError1);
      }

      if (!passwordValidation.test(this.password)) {
        showUserValidationError(showPasswordError2);
      } else {
        hideUserValidationError(showPasswordError2);
      }

      if (!passwordValidation.test(this.checkPassword)) {
        showUserValidationError(showPasswordConfirmError1);
      } else {
        hideUserValidationError(showPasswordConfirmError1);
      }

      if (this.password !== this.checkPassword) {
        showUserValidationError(showPasswordConfirmError1);
        showUserValidationError(showPasswordConfirmError2);
      } else {
        hideUserValidationError(showPasswordConfirmError1);
        hideUserValidationError(showPasswordConfirmError2);
      }
      this.allPassed = true;
    },

    onSubmit() {
      const payload = {
        userId: this.userId,
        password: this.password,
        name: this.name,
        role: this.selectedRole,
        department: this.selectedDepartment,
      };

      if (this.userId.length < 1) {
        return showAlert("공란을 채워주세요");
      }

      console.log(this.userId.length);
      if (this.userId.length > 20) {
        return showAlert("아이디를 20글자 이하로 입력해주세요");
      }

      if (this.password.length < 1) {
        return showAlert("공란을 채워주세요");
      }

      if (this.password.length > 16) {
        return showAlert("비밀번호를 16글자 이하로 입력해주세요");
      }

      if (this.name.length < 1) {
        return showAlert("공란을 채워주세요");
      }

      if (this.selectedRole.length < 1) {
        return showAlert("WORKER 또는 ADMIN을 선택해주세요");
      }

      if (this.selectedDepartment.length < 1) {
        return showAlert("sales 또는 dev를 선택해주세요");
      }

      if (this.allPassed) {
        return this.$store.dispatch("actSignup", payload);
      }
    },
  },
};
</script>

<style scoped>
.show-id-error,
.show-password-error1,
.show-password-error2,
.show-password-confirm-error1,
.show-password-confirm-error2 {
  display: flex;
  justify-content: flex-start;
  color: Red;
  display: none;
  margin: 0px;
}
</style>
