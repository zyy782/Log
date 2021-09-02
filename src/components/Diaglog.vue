<template >
  <div>
    <el-dialog :title="title" :visible="dialogVisible" @close="close">
      <el-form :model="form" :rules="formRules">
        <el-form-item
          v-for="(item, index) in formItem"
          :label="item.label"
          :label-width="labelWidth"
          :key="index"
        >
          <!--根据type来显示是什么标签-->
          <el-input
            v-model="form[item.model]"
            :placeholder="'请输入' + item.label"
            v-if="item.type === 'input'"
            :disabled="item.readonly"
          ></el-input>
          <el-select
            v-model="form[item.model]"
            :placeholder='"请选择" + item.label'
            v-if="item.type === 'select'"
          >
            <!--如果是select或者checkbox 、Radio就还需要选项信息-->
            <el-option
              v-for="item in item.opts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-col :span="2">
            <el-switch
              v-model="form[item.model]"
              v-if="item.type === 'switch'"
              align="left"
            ></el-switch>
          </el-col>
          <el-col :span="2">
            <el-date-picker
              v-if="item.type === 'datetime'"
              value-format="yyyy-MM-dd hh:mm:ss"
              v-model="form[item.model]"
              type="datetime"
              placeholder="选择日期时间"
              align="left"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <!--留一个插槽-->
        <el-form-item><slot></slot></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  props: {
    formRules:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    formItem: {
      type: Array,
      default: () => {
        return [
          {
            model: "hobbies",
            label: "用户名",
            type: "select",
            options: [
              {
                label: "篮球",
                value: "basketball",
              },
            ],
          },
        ];
      },
    },
    form: {
      type: Object,
    },
    title: {
      type: String,
      default: () => "对话框",
    },
    dialogVisible: {
      type: Boolean,
      default: () => false,
    },
    labelWidth: {
      type: String,
      default: () => "180px",
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      // console.log('closed');
      this.$emit("closeDialog");
    },
    submit() {
      this.$emit("submitData", this.form);
    },
  },
};
</script>
<style scoped>
.el-select{
  display: block;
}
</style>