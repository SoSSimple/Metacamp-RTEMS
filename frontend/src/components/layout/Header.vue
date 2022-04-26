<template>
  <div>
    <nav>
      <div class="logo" @click="$router.push('/webgl')">RTEMS</div>
      <label for="btn" class="icon">
        <span class="fa fa-bars"></span>
      </label>
      <input type="checkbox" id="btn" />
      <ul>
        <li><a href="http://192.168.43.208:1880/ui">NODE RED</a></li>
        <li>
          <label for="btn-1" class="show">Features +</label>
          <a href="#">Features</a>
          <input type="checkbox" id="btn-1" />
          <ul class="nav-detail">
            <li @click="$router.push('/webgl')">디지털트윈</li>
            <li @click="$router.push('/dashboard')">대시보드</li>
            <li @click="$router.push('/user')">사용자 관리</li>
            <li @click="$router.push('/device')">장비 관리</li>
            <li @click="$router.push('/workorder')">작업지시서</li>
            <li @click="$router.push('/result')">작업결과</li>
          </ul>
        </li>
        <li><a href="#">MyPage</a></li>
        <li @click="onClickLogout"><a href="#">Logout</a></li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    onClickLogout() {
      sessionStorage.clear();
      this.$router.push("/");
      this.$router.go();
      console.log("success");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  background: #f2f2f2;
}
nav {
  background: #1b1b1b;
}
nav:after {
  content: "";
  clear: both;
  display: table;
}
nav .logo {
  float: left;
  color: white;
  font-size: 27px;
  font-weight: 600;
  line-height: 70px;
  padding-left: 60px;
}
nav ul {
  z-index: 100;

  float: right;
  margin-right: 40px;
  list-style: none;
  position: relative;
}
nav ul li {
  float: left;
  display: inline-block;
  background: #1b1b1b;
  margin: 0 5px;
}
nav ul li a {
  color: white;
  line-height: 70px;
  text-decoration: none;
  font-size: 18px;
  padding: 8px 15px;
}
nav ul li a:hover {
  color: cyan;
  border-radius: 5px;
  box-shadow: 0 0 5px #33ffff, 0 0 10px #66ffff;
}
nav ul ul li {
  line-height: 50px;
}

nav ul ul li:hover {
  box-shadow: none;
}
nav ul ul {
  position: absolute;
  top: 90px;
  border-top: 3px solid cyan;
  opacity: 0;
  visibility: hidden;
  transition: top 0.3s;
}
nav ul ul ul {
  border-top: none;
}
nav ul li:hover > ul {
  top: 70px;
  opacity: 1;
  visibility: visible;
}
nav ul ul li {
  position: relative;
  margin: 0px;
  width: 150px;
  float: none;
  display: list-item;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

nav ul ul ul li {
  position: relative;
  top: -60px;
  left: 150px;
}
.nav-detail {
  color: white;
  text-align: center;
}
.nav-detail li {
  margin-bottom: 1px;
}
.nav-detail li:hover {
  color: cyan;
  border-radius: 5px;
  box-shadow: 0 0 5px #33ffff, 0 0 10px #66ffff;
}
.show,
.icon,
input {
  display: none;
}
.fa-plus {
  font-size: 15px;
  margin-left: 40px;
}
@media all and (max-width: 968px) {
  nav ul {
    margin-right: 0px;
    float: left;
  }
  nav .logo {
    padding-left: 30px;
    width: 100%;
  }
  .show + a,
  ul {
    display: none;
  }
  nav ul li,
  nav ul ul li {
    display: block;
    width: 100%;
  }
  nav ul li a:hover {
    box-shadow: none;
  }
  .show {
    display: block;
    color: white;
    font-size: 18px;
    padding: 0 20px;
    line-height: 70px;
    cursor: pointer;
  }
  .show:hover {
    color: cyan;
  }
  .icon {
    display: block;
    color: white;
    position: absolute;
    top: 0;
    right: 40px;
    line-height: 70px;
    cursor: pointer;
    font-size: 25px;
  }
  nav ul ul {
    top: 70px;
    border-top: 0px;
    float: none;
    position: static;
    display: none;
    opacity: 1;
    visibility: visible;
  }
  nav ul ul a {
    padding-left: 40px;
  }
  nav ul ul ul a {
    padding-left: 80px;
  }
  nav ul ul ul li {
    position: static;
  }
  [id^="btn"]:checked + ul {
    display: block;
  }
  nav ul ul li {
    border-bottom: 0px;
  }
  span.cancel:before {
    content: "\f00d";
  }
}
.content {
  z-index: -1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
header {
  font-size: 35px;
  font-weight: 600;
  padding: 10px 0;
}
p {
  font-size: 30px;
  font-weight: 500;
}
</style>
