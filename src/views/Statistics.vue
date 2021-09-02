<template>
  <div class="charts">
    <area-chart ></area-chart>
    <div id="charts">
      <el-row :gutter="10">
        <el-col :sm="24" :md="12" :lg="12" :xl="12">
          <div class="chart">
            <pie-chart v-loading="loadingPie" ref="pieChart" :option="options"></pie-chart>
          </div>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12" :xl="12">
          <div class="chart">
            <bar-chart></bar-chart>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import pieChart from "@/components/echarts/PieChart";
import barChart from "@/components/echarts/BarChart";
import AreaChart from "@/components/echarts/AreaChart.vue";
// import DynamicChart from '@/components/echarts/DynamicChart'

import logApi from "../api/log";

export default {
  name: "Charts",
  components: {
    AreaChart,
    pieChart,
    barChart,
    // DynamicChart
  },
  data() {
    return {
      loadingPie:true,
      speed: [],
      total: [],
      num: [],
      options: {
        title: {
          text: "发送的日志总数",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "日志总数",
            type: "pie",
            data: [{ num: 12346, name: "wzq" }],
            radius: "50%",
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    logApi.getTotal().then((res) => {
      // console.log(res)
      this.total = res.data.data;
      // console.log(this.$refs.pieChart);
      this.options.series[0].data = this.total;
      this.$refs.pieChart.updateChart(this.options);
      this.loadingPie=false
    });
  },
};
</script>
<style scoped>
/* #charts{
  display: flex;
  justify-content: center;
  
}
.charts{
  margin-top:80px;
}
.chart{
  width: 48%;
} */
#charts{
  margin: 3px 50px 0px 70px;
}
.title {
  position: fixed;
  top: 460px;
  left: 25%;
  color: #575757;
  /* font-size: 14px; */
}
.title2 {
  position: fixed;
  top: 460px;
  right: 25%;
  color: #575757;
}
</style>
 