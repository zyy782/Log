<template>
  <div class="barchart" v-loading="loading">
    <div ref="barChart" style="width: 100%; height: 300px; margin-top:2vh"></div>
  </div>
</template>

<script>
import logApi from "../../api/log.js"
export default {
  props: {
    data: {
      required: false,
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      loading:true,
      chartInstance: null,
      option: {},
      datax: [],
      datay: [],
    }
  },
  async created() {
    const { data } = await logApi.getTop()
    const logs = data.data
    // console.log(logs)
    for (let i = 0; i < logs.length; i++) {
      this.datax.push(logs[i].name)
      this.datay.push(logs[i].value)
    }
    this.loading = false
    this.initChart()
  },
  mounted() {
    // this.updateChart()
    window.addEventListener("resize", this.handleResize)
  },
  methods: {
    initChart() {
      const datax = this.datax
      const datay = this.datay
      // console.log(datax)
      var chartDom = this.$refs.barChart
      this.chartInstance = this.$echarts.init(chartDom)
      // this.option = {
      //   color: "#4F94CD",
      //   // color: "#4287f5",
      //   xAxis: {
      //     type: "category",
      //     data:datax
      //   },
      //   yAxis: {
      //     type: "value",
      //   },
      //   series: [
      //     {
      //       data:datay,
      //       type: "bar",
      //       showBackground: true,
      //       backgroundStyle: {
      //         color: "rgba(180, 180, 180, 0.2)",
      //       },

      //     },
      //   ],
      // }
      this.option = {
        xAxis: {
          type: "category",
          data: datax,
          // data:["212.174.127.43","212.174.127.43","212.174.127.43","212.174.127.43"]
        },
        yAxis: {
          type: "value",
        },
        title: {
          left: "center",
          text: "传输总量对比",
        },
        series: [
          {
            data: datay,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      }

      this.option && this.chartInstance.setOption(this.option)
    },
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
/* .barchart {
  width: 40%;
  position: fixed;
  top: 460px;
  left: 50%;
  right: 10%;
} */
</style>
