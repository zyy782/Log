<template>
  <div style="width: 400px">
    <el-skeleton
      style="width: 400px; height: 500px"
      :loading="loading"
      animated
    >
      <template slot="template" style="margin: 0 auto">
        <el-skeleton-item variant="div" style="width: 400px; height: 150px" />
        <el-skeleton-item variant="div" style="width: 400px; height: 258px" />
      </template>

      <template>
        <el-card>
          <div slot="header" style="height: 100px; paddding: 0">
            <div class="from title">
              日志来源：<span @click="searchLogs(log.fileName)">{{
                log.fileName
              }}</span>
              第 <span @click="searchLogs(log.row)"> {{ log.row }} </span> 行
            </div>
            <div class="ip title">
              主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：<span
                @click="searchLogs(log.ip)"
                >{{ log.ip }}</span
              >
            </div>
            <div class="mac title">
              MAC地址：<span @click="searchLogs(log.mac)">{{ log.mac }}</span>
            </div>
          </div>
          <div class="log-content title">
            {{ log.content }}
          </div>
          <div class="time">
            {{ time }}
          </div>
        </el-card>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { validation } from "../tools";
export default {
  name: "LogCard",
  props: {
    log: Object,
    loading: Boolean,
  },
  computed: {
    time() {
      return new Date(this.log.time).toLocaleString();
    },
  },
  data() {
    return {
      // loading: true,
    };
  },
  mounted() {
    // this.loading = false;
  },
  methods: {
    searchLogs(value) {
      const key = validation.checkType(value);
      const query = {};
      query[key] = value;
      this.$emit("searchLogs", query);
    },
  },
};
</script>

<style lang="scss" >
#app {
  // background: #bfbf1bf;
  .log-content {
    
    display: flex;
    word-wrap: break-word;
    word-break: break-all;
    width: 360px;
    height: 200px;
    text-align: left;
    line-height: 2;
    overflow: auto;
    font-family: Helvetica, Arial, "华文细黑" ， "微软雅黑";
    // color:#f8f9fa;
  }
  
   .el-card  {
     .el-card__header{
      //  color:#f8f9fa;
       border-radius: 2px;
      //  border-bottom: 1px solid #bfbfbf;
      //  background: #d3d3d3;
     }
     .el-card__body{
      //  background: #c0c0c0;
       border-radius: 2px;
     }
     .is-always-shadow{
       margin: 0;
     }
    
  }

  /* background: #e2e3e5; */
}
/* .ip {
  background: #d4edda;
}
.from {
  background: #d1ecf1;
} */
/* .mac {
  background: pink;
} */
#app {
  .title{
    text-align: left;
    font-size: 1rem;
    margin-top: 2vh;
  }
  
}

#app .time {
  text-align: right;
  // color:#f8f9fa;
}
span {
  /* text-decoration: underline; */
  color: #007bff;
  cursor: pointer;
  // text-align: right;
  font-weight: bold;
  
}

span:active {
  color: purple;
}
</style>