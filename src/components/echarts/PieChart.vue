<template>
  <div class="piechart">
    <div ref="pie" style="width: 100%; height: 300px;margin-top:2vh;margin-left:3vw"></div>
  </div>
</template>

<script>
export default {
  name:'PieChart',
  props:{
    option:Object
  },
  data() {
    return {
      
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize)
    this.initChart()
  },
  created() {
    
  },
  methods: {
    // 初始化echarts实例
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.pie)
      
    },
    updateChart(option) {
      
      option && this.chartInstance.setOption(option)
    },
    // 当浏览器大小发生变化会调用该方法，完成屏幕适配
    handleResize() {
      this.chartInstance && this.chartInstance.resize()
    },
  },
  beforeDestroy() {
    this.chartInstance && this.chartInstance.dispose()
    this.chartInstance = null
    window.removeEventListener("resize", this.handleResize)
  },
}
</script>

<style scoped>
/* .piechart {
  position: fixed;
  top: 460px;
  width: 50%;
  left: 10%;
} */
</style>
