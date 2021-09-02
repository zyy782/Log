<template>
  <div id="logPage">
    <div id="search">
      <el-input
        class="search"
        placeholder="输入ip/mac/文件名/行号检索"
        v-model.trim="queryStr"
        clearable
        @keyup.enter.native="search"
      >
      </el-input>
      <div id="operation">
        <b-button class="export" variant="primary" @click="exportLogs"
          >日志导出</b-button>
          <!-- <el-button type="primary">日志导出</el-button> -->
      </div>
    </div>
    <div id="logs">
      <log-card
        class="box-card"
        v-for="log in logs"
        :key="log.id"
        :log="log"
        :loading="logLoading"
        @searchLogs="getLogs"
        ref="card"
      ></log-card>
    </div>
    <div v-loading="loadMore" class="loading"></div>

    <!-- 在组件上使用监听事件需添加.native修饰符 -->
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import LogCard from "@/components/LogCard"
import logApi from "../api/log"
import BackTop from "@/components/BackTop"

import { validation } from "../tools"
export default {
  name: "Logs",
  components: {
    LogCard,
    BackTop,
  },
  data() {
    return {
      queryStr: "",
      pageSize: 100,
      page: 1,
      time: null,
      query: null,
      timer: null,
      loadMore: false,
      keyword: "",
      ip: "",
      mac: "",
      fileName: "",
      row: "",
      logLoading: true,
      logs: [{}, {}, {}, {}, {}, {}, {}, {}],
      scrollTop:0,
      isShowBackTop: false,
    }
  },
  created() {
    this.getLogs()
  },
  mounted() {
    window.addEventListener("scroll", this.throttle(this.judgeBottom, 200))
    
    // 回到顶部throttle(realFunc,500,1000)
    window.addEventListener("scroll",this.debounce(this.handleScroll,300),true)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  destroyed() {
    // window.removeEventListener('scroll',this.handleScroll)
  },
  methods: {
    debounce(fn,delay){
      let timer
      return function(){
        // const context = this
        // const args = arguments
        clearTimeout(timer)
        timer=setTimeout(() => {
          fn.apply(this,arguments)
        }, delay);
      }
    },
    exportLogs() {
      // console.log("export");
      location.href = "http://10.11.47.251:8081/log/download?fileName=1.txt"
    },

    search() {
      const type = validation.checkType(this.queryStr)
      const query = {}
      query[type] = this.queryStr
      this.getLogs(query)
    },
    loadMoreLogs() {
      
      this.loadMore = true
      this.query.page += 1
      logApi
        .getLogs(this.query)
        .then((res) => {
          this.logs = this.logs.concat(res.data.data)
        })
        .catch((err) => {
          this.$hint("error", err.message)
        })
        .finally(() => {
          this.loadMore = false
        })
    },
    judgeBottom() {
      const body = document.body
      const html = document.documentElement
      //滚动条在Y轴上滚动的距离
      const scrollTop = html.scrollTop || window.pageYOffset || body.scrollTop
      //文档的总高度
      const scrollHeight =
        html.scrollHeight > body.scrollHeight
          ? html.scrollHeight
          : body.scrollHeight
      //浏览器视窗高度
      const clientHeight = window.innerHeight
      
      if (scrollTop + clientHeight >= scrollHeight-1) {
        // console.log('loadmore');
        this.loadMoreLogs()
      }
    },
    throttle(fn, delay) {
      
      return function() {
        if (this.timer) {
          return
        }
        const context = this
        const args = arguments
        this.timer = setTimeout(() => {
          fn.apply(context, args)
          this.timer = null
        }, delay)
      }
    },
    loadLogs() {
      this.logs.push({})
    },
    logLoaded() {
      this.logLoading = false
    },
    getLogs(query = {}) {
      // console.log(1);
      this.logLoading=true
      query.page = this.page
      query.pageSize = this.pageSize
      // console.log(query)
      this.query = query
      logApi
        .getLogs(query)
        .then((res) => {
          // console.log(res);
          if (res.data.code===400){
            throw new Error(res.data.data)
          }
          this.logs = res.data.data
          
        })
        .catch((err) => {
          this.$hint("error", err.message)
        })
        .finally(() => {
          this.logLoaded()
        })
    },
    // 保存滚动值
     handleScroll () {
      this.scrollTop = document.documentElement.scrollTop
      if(this.scrollTop > 800){
        this.isShowBackTop = true
      }
      // console.log(this.scrollTop)
    },
   // 回到顶部
    backClick() {
      document.documentElement.scrollTop = 0
      this.isShowBackTop = false
    },
    
},
}

</script>

<style lang="scss" scoped>
// #operation{
//   display: flex;
//   justify-content: space-between;

// }
// .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
//   width: 80vw;
// }
.back-top{
  cursor: pointer;
}
.search {
  /* margin-right: 4vw; */
  width: 400px;
  margin-left: 2vw;
  margin-right:2vw ;
}
.export{
  .btn{
    position: relative;
    right: 0;
  }
  @media (max-width:532px) {
    margin-top:2vh;
  }
  // width:20vw;
}
.time {
  margin-top: 2vh;
}
#bar {
  position: fixed;
  /* top: 0; */
}
.loading {
  height: 10vh;
}
#logPage {
  /* margin-top: 80px; */
  margin-top: 88px;
}

#logs {
  display: flex;
  max-width: 100vw;
  flex-wrap: wrap;
  justify-content: center;
}
.box-card {
  margin-left: 2vw;
}
#search {
  display: flex;
  margin: 4vh 2vw;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
