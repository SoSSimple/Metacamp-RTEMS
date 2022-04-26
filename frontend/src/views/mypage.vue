<template>
  <div>
    <div class="mypage-wrapper">
      <h1>사용자 정보</h1>
      <div>
        <h3>유저 아이디</h3>
        <input type="text" disabled :value="`${this.userId}`" />
      </div>
      <div>
        <h3>유저 이름</h3>
        <input type="text" disabled :value="`${this.userName}`" />
      </div>
      <div>
        <h3>유저 권한</h3>
        <input type="text" disabled :value="`${this.userRole}`" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      userName: "",
      userRole: "",
    };
  },

  created() {
    console.log(sessionStorage);
    this.userId = sessionStorage.userId;
    this.userName = sessionStorage.name;
    this.userRole = sessionStorage.role;
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100vh;
}
.main h1 {
  text-align: center;
  margin-bottom: 80px;
}
.main div {
  width: 460px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}

.mypage-wrapper {
  z-index: -100;
  padding: 30px;
  background: white;
  flex-wrap: nowrap;
}
.mypage-wrapper h3,
.mypage-wrapper div {
  width: 100%;
  text-align: center;
  color: #1b1b1b;
}
.mypage-wrapper div input {
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
  border-radius: 5px;
}
.mypage-wrapper input {
  margin-bottom: 30px;
}
</style>
