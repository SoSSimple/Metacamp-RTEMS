<template>
  <div>
    <div class="sidebar" style="margin-top: 93px">
      <ul>
        <li @click="$router.push('/webgl')">디지털트윈</li>
        <li @click="$router.push('/dashboard')">대시보드</li>
        <li @click="$router.push('/example')">example</li>
        <li @click="$router.push('/user')">사용자 관리</li>
        <li @click="$router.push('/device')">장비 관리</li>
        <li @click="$router.push('/workorder')">작업지시서</li>
        <li @click="$router.push('/result')">작업결과</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.sidebar {
  display: block;
  position: fixed;
  left: 0;
  width: 310px;
  height: 100%;
  background: #042331;
}
.sidebar ul {
  display: block;
  height: 100%;
  width: 100%;
  line-height: 65px;
  font-size: 20px;
  color: white;
  padding-left: 40px;
  box-sizing: border-box;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid black;
  transition: 0.4s;
  cursor: pointer;
}

ul li:hover a {
  padding-left: 50px;
}

.sidebar ul a i {
  margin-right: 16px;
}
</style>
