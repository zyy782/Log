<template>
  <div>
    <div style="width:400px;height:300px;" ref="dynamicChart" class="dynamic"></div>
  </div>
</template>

<script>
import logApi from "../../api/log";
export default {
  name: "Dynamic",
  data() {
    return {
      chart: null,
      option: null,
      data:[],
      xdata:[]
      
    };
  },
  created() {},
  async mounted() {
    this.initChart()
    const {data} = await logApi.getAllData()
    const logs = data.data
    for(let i=0;i<logs.length;i++){
      this.data.push(logs[i].value)
      this.xdata.push(logs[i].name)
    }
    this.updateChart()
    
    
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.dynamicChart);
    },
    updateChart() {
      const data = this.data
      console.log(data);
      this.option = {
        title: {
          text: "动态数据 + 时间坐标轴",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              " : " +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: "time",
          data:this.xdata,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: data,
          },
        ],
      };
      this.option&&this.chart.setOption(this.option);
    },
  },
};
</script>

<style>
</style>