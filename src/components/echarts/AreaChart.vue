<template>
  <div class="area">
    <div
      v-loading="loading"
      ref="area"
      style="width: 100%; height: 400px;margin-top:8px"
    ></div>
  </div>
</template>

<script>
import logApi from "../../api/log.js";
export default {
  props: {
    data: {
      required: false,
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  data() {
    return {
      timer:null,
      loading: true,
      chartInstance: null,
      option: {},
      date: [],
      ydata: [],
      // timer:null
    };
  },
  async mounted() {
    // this.updateChart()
    this.initChart();
    await this.getData()
    this.loading = false;
    this.updateChart()
    // this.timer=setInterval(this.getData,1000)
    window.addEventListener("resize", this.debounce(this.handleResize,300));
    // this.refs.area.addEventListener('DOMMouseScroll',()=>{
    //   console.log('mousescroll');
    //   if(!this.timer){
    //     return 
    //   }
    //   clearInterval(this.timer)
    //   this.timer = null
    // })
  },
  async created() {
    // console.log(this.date)
    
    

    // console.log(this.date)
  },
  methods: {
    async getData(){
      const { data } = await logApi.getAllData();
      // console.log(data)
      const logs = data.data;
      // console.log(logs);

      for (let i = 0; i < logs.length; i++) {
        //  console.log(logs[i])
        this.date.push(logs[i].name);
        this.ydata.push(logs[i].value);
        // console.log(this.date)
      }
      this.updateChart()
      
    },
    debounce(fn,delay){
      // let timer;
      return function(){
        const context = this
        const args = arguments
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          fn.apply(context,args)
        },delay)
      }
    },
    initChart() {
      const chartDom = this.$refs.area;
      // console.log(chartDom);
      this.chartInstance = this.$echarts.init(chartDom);
    },
    updateChart(){
      var date = this.date;

      var data = this.ydata;
      // console.log('data:', data)

      this.option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "近24小时每秒发送的日志数量",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          // data: ydata,
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "日志条数",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: data,
          },
        ],
      };
      this.option && this.chartInstance.setOption(this.option);
    },
    handleResize() {
      
      console.log('resize');
      this.chartInstance && this.chartInstance.resize();
    },
  },
  beforeDestroy() {
    this.chartInstance && this.chartInstance.dispose()
    this.chartInstance = null
    window.removeEventListener("resize", this.handleResize)
    // console.log(this.timer);
    // clearInterval(this.timer)
    // this.timer=null
  },
};
</script>

<style scoped>
/deep/ .el-loading-mask {
  z-index: 0;
}

.area {
  width: 100%;
}
</style>
