<template>
  <div class="home">
    <!-- <res-tab-bar></res-tab-bar> -->
    <div class="content">
      <Table
        :dataSource="assets"
        :searchProps="search"
        :loading="tableLoading"
        :columns="columns"
        :add-data="add"
        :buttons="buttons"
        :init-table-data="tableData"
        :add-loading="addDataLoading"
        :delete-loading="deleteSelectedLoading"
        empty-text="资产列表是空的哦！"
        excelName="日志表.xls"
        @changeTableData="dataFilter"
        @resetTableData="resetAssets"
        @handleSelection="handleSelectedData"
        @handleDelete="deleteSelected"
      />

      <Dialog
        title="新增资产"
        :form="addForm"
        :form-item="addFormItem"
        :dialogVisible="addDialogVisible"
        label-width="180px"
        @submitData="addData"
        @closeDialog="closeAddDialog"
        :form-rules="rules"
      />

      <Dialog
        title="编辑资产"
        :form="editForm"
        :form-item="editFormItem"
        :dialogVisible="editDialogVisible"
        label-width="180px"
        @submitData="editData"
        @closeDialog="closeEditDialog"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/Table.vue"
import Dialog from "@/components/Diaglog.vue"
// import ResTabBar from "@/components/NavBar.vue"

import assetApi from "../api/asset"

export default {
  name: "Home",
  components: {
    Table,
    Dialog,
    // ResTabBar,
  },
  data() {
    const instance = this
    // const checkIP = (rule,value,cb)=>{
    //   if(!value){
    //     return cb(new Error('请输入IP地址'))
    //   }
    // }
    // const checkMAC = (rule,value,cb)=>{
    //   if(!value){
    //     return cb(new Error('请输入Mac地址'))
    //   }
    // }
    return {
      ids:[],
      rules:{

      },
      editFormItem: [
        {
          model: "id",
          label: "资产id",
          type: "input",
          readonly: true,
        },
        {
          model: "name",
          label: "资产名",
          type: "input",
        },
        {
          model: "ip",
          label: "资产ip",
          type: "input",
          readonly: true,
        },
        {
          model: "time",
          label: "资产添加时间",
          type: "datetime",
        },
        {
          model: "status",
          label: "是否停止接受日志",
          type: "switch",
        },
        {
          model: "mac",
          label: "资产mac地址",
          type: "input",
          readonly: true,
        },
        {
          model: "encode",
          label: "日志编码方式",
          type: "select",
          opts:[
            {
              value:'utf-8',
              label:'utf-8'
            },{
              value:'gbk',
              label:'gbk'
            }
          ]
        },
      ],
      addFormItem: [
        {
          model: "name",
          label: "资产名",
          type: "input",
        },
        {
          model: "ip",
          label: "资产ip",
          type: "input",
        },
        {
          model: "time",
          label: "资产添加时间",
          type: "datetime",
        },
        {
          model: "status",
          label: "是否停止接受日志",
          type: "switch",
        },
        {
          model: "mac",
          label: "资产mac地址",
          type: "input",
        },
        {
          model: "encode",
          label: "日志编码方式",
          type: "select",
          opts:[
            {
              value:'utf-8',
              label:'utf-8'
            },{
              value:'gbk',
              label:'gbk'
            }
          ]
        },
      ],
      editDialogVisible: false,

      deleteSelectedLoading: false,
      addDataLoading: false,
      selectedItems: [],
      addDialogVisible: false,
      addForm: {
        name: "",
        ip: "",
        time: null,
        status: false,
        mac: "",
        encode: "",
      },
      editForm: {
        id: "",
        name: "",
        ip: "",
        time: null,
        status: false,
        mac: "",
        encode: "utf-8",
      },
      tableData: [],
      assets: [],
      search: {
        prompt: "输入MAC地址来检索资产",
        prop: "mac",
      },
      tableLoading: true,
      columns: [
        {
          hasSort: false,
          isShow: true,
          prop: "name",
          label: "资产名",
          align: "center",
          width: 200,
        },
        {
          hasSort: false,
          isShow: true,
          prop: "ip",
          label: "资产IP地址",
          align: "center",
          width: 200,
        },
        {
          hasSort: true,
          isShow: true,
          prop: "time",
          label: "资产添加时间",
          align: "center",
          width: 200,
        },
        {
          hasSort: false,
          isShow: true,
          prop: "status",
          label: "是否停止接收日志",
          align: "center",
          width: 160,
        },
        {
          hasSort: true,
          isShow: true,
          prop: "mac",
          label: "资产MAC地址",
          align: "center",
          width: 200,
        },
        {
          hasSort: false,
          isShow: true,
          prop: "encode",
          label: "日志编码方式",
          align: "center",
          width: 160,
        },
      ],
      buttons: [
        {
          id: 1,
          type: "primary",
          label: "编辑",
          loading: false,
          operate: ($index, row) => {
            this.editForm = row;
            this.editDialogVisible = true;
          },
        },
        {
          id: 2,
          type: "danger",
          label: "删除",
          loading: false,
          operate: function($index, row) {
            // this.deleteSelected()
            this.loading = true
            // console.log(instance)
            instance.deleteData(row.id, () => {
              
              this.loading = false;
            });
          },
        },
      ],
    }
  },
  computed:{
    // multiDelete(){
    //   if(this.selectedItems.length>0){
    //     return true
    //   }else{
    //     return false
    //   }
    // }
  },
  created() {
    this.fetchAssets()
  },
  methods: {
    afterDeleted(id) {
      const asset = this.assets.find((item) => item.id === id);
      this.assets.splice(this.assets.indexOf(asset), 1);
      this.$hint("success", `id为${id}的资产已删除！`);
    },
    closeEditDialog() {
      this.editDialogVisible = false
    },
    editData() {
      assetApi
        .editAsset(this.editForm)
        .then((res) => {
          console.log(res.data)
          this.$hint("success", '更新成功！')
        })
        .catch((err) => {
          this.$hint("error", err.message);
        })
        .finally(() => {
          this.closeEditDialog()
        })
    },
    deleteData(id, cb) {
      // console.log(this.$confirm);
      this.$alert("此项将永久删除选中项是否继续", "警告！")
        .then(() => {
          assetApi.removeAsset({ id }).then(()=>this.afterDeleted(id));
        })
        .catch((err) => {
          if (err === "cancel") {
            this.$hint("info", "已取消操作");
          } else {
            console.log(err);
            this.$hint("error", err.message);
          }
        })
        .finally(cb);
    },
    tableDataLoading() {
      this.tableLoading = true
    },
    tableDataLoaded() {
      this.tableLoading = false
    },
    mapAssetsStatus() {
      this.assets = this.assets.map((item) => {
        if (item.status) {
          item["status"] = "是"
        } else {
          item["status"] = "否"
        }
        return item
      })
    },
    addBtnLoading() {
      this.addDataLoading = true
    },
    addBtnLoaded() {
      this.addDataLoading = false
    },
    deleteSelected() {
      this.deleteSelectedLoading = true;
      const ids = this.ids
      if(this.ids==0){
        this.$hint('info','请选中数据后再删除哦！')
        this.deleteSelectedLoading = false;
        return
      }
      // console.log(ids);
      // this.deleteData(JSON.stringify(ids), () => {
      //   this.deleteSelectedLoading = false;
      // });
      this.$alert("此操作将永久删除您所选中的项，您确认继续吗？", "警告")
        .then(() => {
          for (const id of ids) {
            assetApi.removeAsset({ id }).then(()=>this.afterDeleted(id));
          }
        })
        .catch((err) => {
          if(err.message)
            this.$hint("error", err.message);
          else
            this.$hint('info','已取消操作')
        })
        .finally(() => {
          this.deleteSelectedLoading = false;
        });
    },
    handleSelectedData(selection) {
      this.selectedItems = selection
      
      this.ids = this.selectedItems.map((item) => item.id);
      // return ids
      // console.log(ids);
    },
    fetchAssets() {
      this.tableDataLoading()
      assetApi
        .getAllAssets()
        .then((res) => {
          this.assets = res.data.data.assets
          this.tableData = this.assets
          // console.log(res);
          // this.mapAssetsStatus()
        })
        .catch((err) => {
          this.$hint("error", err.message);
        })
        .finally(() => {
          this.tableDataLoaded()
        })
    },
    closeAddDialog() {
      this.addDialogVisible = false
    },
    addData() {
      this.addBtnLoading();
      // console.log(this.addForm);
      assetApi
        .addAsset(this.addForm)
        .then((res) => {
          console.log(res);
          this.$hint('success','添加成功！')
          this.assets.unshift(res.data.data);
        })
        .catch((err) => {
          // console.log(err);
          this.$hint("error", err.message);
        })
        .finally(() => {
          this.addBtnLoaded()
          this.closeAddDialog()
        })
    },
    add() {
      this.addDialogVisible = true
    },
    dataFilter(data) {
      this.assets = data
    },
    resetAssets() {
      this.assets = this.tableData
    },
  },
}
</script>

<style scoped>
.home{
  max-height: 100%;
  overflow: hidden;
  margin-top: 70px;
  
  /* position: relative; */
}

.content {
  height: calc(100% - 70px);
  /* overflow: hidden; */
  position: absolute;

  /* overflow: hidden; */
  width: 100%;
}
</style>
