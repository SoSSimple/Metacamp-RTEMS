<template>
  <div>
    <div class="sidebar">
      <ul>
        <li @click="$router.push('/webgl')"><a href="#">디지털트윈</a></li>
        <li @click="$router.push('/dashboard')"><a href="#">대시보드</a></li>
        <li @click="$router.push('/user')"><a href="#">사용자 관리</a></li>
        <li @click="$router.push('/device')"><a href="#">장비 관리</a></li>
        <li @click="$router.push('/workorder')"><a href="#">작업지시서</a></li>
        <li @click="$router.push('/result')"><a href="#">작업결과</a></li>
      </ul>
    </div>
  </div>
  <!--  <b-list-group>-->
  <!--    <b-list-group-item href="#" @click="$router.push('/webgl')"-->
  <!--      >디지털트윈</b-list-group-item-->
  <!--    >-->
  <!--    <b-list-group-item href="#" @click="$router.push('/dashboard')"-->
  <!--      >대시보드</b-list-group-item-->
  <!--    >-->
  <!--    <b-list-group-item href="#" @click="$router.push('/user')"-->
  <!--      >사용자 관리</b-list-group-item-->
  <!--    >-->
  <!--    <b-list-group-item href="#" @click="$router.push('/device')"-->
  <!--      >장비 관리</b-list-group-item-->
  <!--    >-->
  <!--    <b-list-group-item href="#" @click="$router.push('/workorder')"-->
  <!--      >작업지시서</b-list-group-item-->
  <!--    >-->
  <!--    <b-list-group-item href="#" @click="$router.push('/result')"-->
  <!--      >작업결과</b-list-group-item-->
  <!--    >-->
  <!--  </b-list-group>-->
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
  position: fixed;
  left: 0;
  width: 310px;
  height: 100%;
  background: #042331;
}
.sidebar ul a {
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
}

ul li:hover a {
  padding-left: 50px;
}

.sidebar ul a i {
  margin-right: 16px;
}
</style>
