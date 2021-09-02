<template>
  <div id="table">
    <!-- 表格 -->
    <div class="excel">
      <download-excel :data="dataSource" :fields="fields" :name="excelName">
        <el-button type="primary">导出数据</el-button>
      </download-excel>
    </div>
    <el-button class="add" type="success" @click="addData" v-if="showAddButton" :loading="addLoading"
      >添加</el-button
    >
    <el-button class="delete" type="danger"  @click="deleteData" v-if="showDeleteButton" :loading="deleteLoading"
      >删除选中项</el-button
    >
    
    <el-input
      class="title_input"
      :placeholder="searchProps.prompt"
      v-model="keyWord"
      @keyup.enter.native="search"
    ></el-input>
    <el-table
      class="el-tb-edit"
      :row-style="rowClassName"
      :empty-text="emptyText"
      @current-change="handleCurrentRowChange"
      highlight-current-row
      :data="
        dataSource.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      v-loading="loading"
      ref="tableRef"
      @selection-change="select"
    >
      <!--数据源-->
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="column in columns"
        header-align="center"
        :sortable="column.hasSort"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :align="column.align"
        :width="column.width"
      >
        <template slot-scope="{ row }">
          <span v-if="row[column.prop]===true"><span class="status disable"></span> 是 </span>
          <span v-else-if="row[column.prop]===false"> <span class="status enable"></span> 否</span>
          <span v-else>{{ row[column.prop] }}</span>

        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="300">
        <template slot-scope="{ row, $index }">
          <el-button
            v-for="button in buttons"
            :key="button.id"
            size="small"
            :type="button.type"
            @click="button.operate($index, row)"
            :loading="button.loading"
            >{{ button.label }}</el-button
          >
          <!-- <el-button size="small" type="warning" @click="edit($index, row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button>
                  <el-button size="small" type="danger" @click="detail($index, row)">详情</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import downloadExcel from "vue-json-excel";
export default {
  name: "Table",
  components: {
    downloadExcel,
  },
  props: {
    dataSource: {
      // 表格数据源
      type: Array,
      default: () => [],
    },
    columns: {
      // 表格的字段展示
      type: Array,
      default: () => [],
    },
    buttons: {
      type: Array,
      default: () => [],
    },
    rowClassName: {
      type: Function,
    },
    searchProps: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    initTableData: {
      type: Array,
    },
    addData: {
      type: Function,
    },
    emptyText: {
      type: String,
      default: "暂无数据",
    },
    excelName: {
      type: String,
      default: "信息表",
    },
    showAddButton: {
      type: Boolean,
      default: true,
    },
    showDeleteButton:{
      type: Boolean,
      default: true
    },
    addLoading:{
      type:Boolean,
      default:false
    },
    deleteLoading:{
      type:Boolean,
      default:false
    },
    enableDelete:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      selection:[],
      keyWord: "",
      currentPage: 1,
      table_index: 999,
      pagesize: 10,
      currentRow: null,
      title: "",
    };
  },
  computed: {
    total() {
      return this.dataSource.length;
    },
    fields() {
      var filedsJson = {};
      for (var i = 0; i < this.columns.length; i++) {
        this.$set(filedsJson, this.columns[i].label, this.columns[i].prop);
      }
      return filedsJson;
    },
    // isSelected(){
    //   console.log(this.selection);
    //   return this.selection.length===0
    // }
  },
  created() {},
  methods: {
    deleteData(){
      this.$emit('handleDelete')
    },
    select(selection){
      
      this.$emit('handleSelection',selection)
      
    },
    create() {},
    search() {
      var prop = this.searchProps.prop;
      var keyWord = this.keyWord;
      if (keyWord == "") {
        this.$message("搜索内容不能为空！");
        this.$emit("resetTableData");
        return;
      }
      var temp = [];
      // console.log(this.initTableData);
      temp = this.initTableData.filter(
        (item) => item[prop].search(keyWord) != -1
      );
      // console.log(temp);
      this.$emit("changeTableData", temp);
    },
    handleCurrentRowChange(val) {
      this.currentRow = val;
      //   console.log(this.$refs);
    },
    
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>

<style lang="scss" scoped>
/* #table{
  width: 100vw;
} */
.status {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-right: 4px;
}
.status.enable {
  background-color: #67C23A;
}
.status.disable {
  background-color: #F56C6C;
}

.pagination{
  margin-top: 2vh;
  margin-bottom: 20px;
  justify-content: center;
  padding-bottom: 2vh;
  /* text-align: center; */
  /* min-width: 768px; */
  flex-wrap: wrap;

}
.add {
  margin: 20px;
  float: left;
}
.delete{
  margin: 20px;
  float:left;
}
.excel {
  margin: 20px;
  float: left;
}
.title_input {
  margin: 20px;
  margin-right: 8vw;
  width: 200px;
  float: right;
}
.search {
  margin: 20px;
  float: right;
}
</style>