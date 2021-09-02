<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue'

export default {
  name: "App",
  components: {
    NavBar
  },
}
</script>

<style scoped>
-webkit-scrollbar {
    width: 1vw;
}
-webkit-scrollbar-thumb {
    border-radius: 0.4vw;
    background: rgba(0, 0, 0, .1);
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
