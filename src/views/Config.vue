<template>
  <div class="config">
    <!-- <res-tab-bar></res-tab-bar> -->
    <div class="scroll-config">
      <!-- <scroll> -->
      <!-- <h2>配置页面</h2> -->
      <div class="config_nav">
        <el-tabs
          :tab-position="tabPosition"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane class="el-pane" label="网络配置" name="first">
            <net-config></net-config>
          </el-tab-pane>
          <el-tab-pane class="el-pane" label="密钥配置" name="second">
            <solve-config></solve-config>
          </el-tab-pane>
          <!-- <el-tab-pane class="el-pane" label="地理配置" name="third">
            <el-button type="text" @click="open"
              >地理配置</el-button
            ></el-tab-pane
          >
          <el-tab-pane class="el-pane" label="其他配置" name="fourth">
            <el-button type="text" @click="open"
              >其他配置</el-button
            ></el-tab-pane
          > -->
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
          <el-tab-pane></el-tab-pane>
        </el-tabs>
      </div>
      <!-- </scroll> -->
    </div>
  </div>
</template>
<script>
import NetConfig from "./config/NetConfig"
import SolveConfig from "./config/SolveConfig"
// import ResTabBar from "@/components/tabbar/ResTabBar"

// import vuescroll from "vuescroll"
export default {
  name: "Config",
  components: {
    NetConfig,
    SolveConfig,
    // ResTabBar,
  },
  data() {
    return {
      activeName: "first",
      tabPosition: "left",
    }
  },
  methods: {
    handleClick(tab) {
      console.log("--------------")
      console.log(tab.index)
    },
    open() {
      this.$alert("暂无配置", "温馨提示", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          })
        },
      })
    },
  },
}
</script>
<style scoped>

.config{
  margin-top: 70px;
  /* height: 100%; */
  overflow: hidden;
}
/* #app .el-tabs__nav{
  z-index: 0;
}
#app .el-tabs__nav-wrap::after{
  z-index:0;
} */


</style>
