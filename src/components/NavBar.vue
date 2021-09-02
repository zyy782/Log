<template>
  <div>
    <b-navbar class="navbar" toggleable="lg" type="dark">
      <b-navbar-brand href="#">日志接收系统</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="item">
          <b-nav-item href="/home">统计</b-nav-item>
          <b-nav-item href="/assets">资产</b-nav-item>
          <b-nav-item href="/logs">日志</b-nav-item>
          <b-nav-item href="/config">配置</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

          <b-nav-item right>
            <!-- Using 'button-content' slot -->
            <!-- <b-nav-item href="/about">关于我们</b-nav-item> -->
            <!-- <a href="/about">关于我们</a> -->
            <router-link to="/about" class="about">关于我们</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
// import {bootstrapReboot.min.css} from '../../../bootstrap/dist/css/bootstrap-reboot.min.css'

export default {
  name: "ResTabBar",
}
</script>
<style scoped>
.navbar{
  /* background-color:	#A1A1A1; */
  /* background-color: #5CACEE; */
  background: #409EFF;
  font-size: 18px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
}
#content {
  background: #686262;
  color: #fff;
  font-family: "Oswald", Arial, sans-serif;
  text-align: left;
}
#hh {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0px;
  right: 0;
  width: 50%;
  height: 30%;
  margin: auto;
}
.about{
  /* color: #fff; */
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
}
a:hover{
  color: #fff;
}
</style>
