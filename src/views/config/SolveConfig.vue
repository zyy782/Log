<template>
  <div class="content">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="加密方式">
        <el-select
          v-model="type"
          placeholder="请选择加密方式"
          style="width:200px"
        >
          <el-option label="ECB" value="ECB"></el-option>
          <el-option label="CBC" value="CBC"></el-option>
        </el-select>
      </el-form-item>
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-form-item label="秘钥">
        <el-input
          v-model.trim="key"
          placeholder="请填写16位秘钥"
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
import netApi from "../../api/netconfig"
export default {
  data() {
    return {
      type: "",
      key: "",
    }
  },
  methods: {
    submit() {
      this.$alert("您确定要更改您的秘钥吗？", "温馨提示")
        .then(() => {
          netApi.configKey({ type: this.type, key: this.key }).then((res) => {
            this.$hint('success',res.data.data)
          })
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
  margin-top: 40px;
  font-size: 20px;

  padding-top: 90px;
  width: 60vw;
  height: 70vh;
  border: 2px solid #d9d9d9;
  border-radius: 10px;
  margin: 80px auto;
  box-shadow: 10px 10px 20px #d9d9d9;
}
.el-button {
  /* float: left; */
  /* margin: 0px 2px 2px 200px; */
  margin: 0px 2px 2px 50px;
}
</style>
