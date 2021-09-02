<template>
  <div class="home">
    <!-- <main-tab-bar></main-tab-bar>
    <home-echart></home-echart> -->
    <!-- <nav-bar></nav-bar> -->
    <charts></charts>
    
  </div>
</template>
<script>
// import MainTabBar from '@/components/mainTabbar/MainTabBar'
import Charts from './Statistics.vue'
// import NavBar from '@/components/NavBar.vue'



export default {
  name: "Home",
  components: {
    // MainTabBar,
    Charts,
    // NavBar
  },
  mounted(){
    
  }
}
</script>
<style scoped>
/* .home {
  position: fixed;
  top: 54px;
  height: 100vh;
}
.left{
width: 100px;
} */

</style>
