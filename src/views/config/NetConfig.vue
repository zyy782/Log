<template>
  <div class="content">
    <el-form :inline="true" class="demo-form-inline">
      &nbsp;&nbsp;&nbsp;&nbsp;<el-form-item label="IP地址">
        <el-input
          v-model.trim="key"
          placeholder="请填写IP地址"
          style="width:200px;height:50px"
          class="input"
          name="IP"
          v-model="ip"
        ></el-input>
      </el-form-item>
      <br />

      <el-form-item label="网卡名称">
        <el-input
          v-model.trim="key"
          name="mac地址"
          disabled
          v-model="name"
          style="width:200px;height:50px"
        ></el-input>
      </el-form-item>
      <br />

      <el-form-item label="子网掩码">
        <el-input
          v-model.trim="key"
          placeholder="请填写16位秘钥"
          style="width:200px;height:50px"
          name="mac地址"
          disabled
          v-model="sub"
        ></el-input>
      </el-form-item>
      <br />

      <el-form-item label="MAC地址">
        <el-input
          v-model.trim="key"
          placeholder="请填写16位秘钥"
          name="mac地址"
          disabled
          v-model="mac"
          style="width:200px;height:50px"
        ></el-input>
      </el-form-item>
      <br />

      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <!-- <el-button type="primary" @click="submit">提交</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import netApi from "../../api/netconfig.js"
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      mac: "env12ed13",
      ip: "10.10.20.30",
      name: "env12",
      sub: "255.255.255.0",
    }
  },
  created() {
    netApi
      .getNetInfo()
      .then((res) => {
        this.mac = res.data.data.mac
        this.ip = res.data.data.ip
        this.name = res.data.data.name
        this.sub = res.data.data.sub
      })
      .catch((err) => {
        this.$hint("error", err.message)
      })
  },
  methods: {
    submit() {
      netApi.postIp({ ip: this.ip }).then((res) => {
        console.log(res)
      })
      this.$alert("您确定将IP地址修改为" + this.ip + "吗？", "温馨提示")
        .then(() => {
          // console.log(res);
          netApi.runConfig().then((res) => {
            this.$hint('success',res.data.data)
          });
        })
        .catch((err) => {
          if (err === "cancel") {
            this.$hint("info", "已取消操作")
          } else {
            this.$hint("err", err.message)
          }
        })
    },
  },
}
</script>
<style scoped>
.content {
  margin-top: 50px;
  padding-top: 75px;
  width: 60vw;
  height: 70vh;
  border: 2px solid #D9D9D9;
   /* border: 2px solid #409eff; */
  border-radius: 10px;
  margin: 80px auto;
  box-shadow: 10px 10px 20px #D9D9D9;
  /* box-shadow: 10px 10px 20px #409eff; */
}
.net-form {
  font-size: 20px;
}
.input {
  width: 300px;
  height: 30px;
  text-align: center;
  vertical-align: middle;
  /* border: 1px solid #1296db; */
}
.el-button {
  /* float: left; */
  margin: 0px 2px 2px 50px;
}
</style>
