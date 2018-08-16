<!--
    新修改的商品单元页面
-->
<template>
  <div class="main-box" clz-type="table">
    <!--
         表格盒子：
         loading : 表格loading
         formDataLabel : 表头数据 类型Array
         leftButton : 左边按钮
         rightButton : 右边按钮
         tableShowDate : 显示的表格列 有字段设置的页面才加
         tableData : 表格数据源
         selection : 是否要勾选框

         //分页数据
         paginationShow : 是否显示 Boolean 默认true
         paginationData : 分页参数值

         selectChange : 多选框选中值
         refreshTable : 刷新方法
     -->
    <div class="boxTitle">敏感词管理</div>
    <div class="header">

    </div>
    <div class="div-table-box">
      <div class="div-table-box-header">
        <div class="box-header-title">
          敏感词列表
        </div>
        <div class="add">
          <el-form :inline="true" ref="formData" label-position="left" class="demo-form-inline">
            <el-row :span="24">
              <el-col :span="24">
                <el-form-item label="添加敏感词：" label-width="100px">
                  <el-input style="width: 400px" size="small" placeholder="请输入敏感词">
                    <el-button                    slot="append">添加</el-button>
                  </el-input>
                  <el-button @click="openDialog" style="margin-left: 30px" size="small" type="primary">批量导入</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <table-box
        :index="false"
        :selection="false"
        :loading.sync="loading"
        :formDataLabel="formDataLabel"
        :leftButton="leftButton"
        :rightButton="rightButton"
        :tableShowData="tableShow"
        :paginationData.sync="paginationData"
        :selectChange.sync="selectData"
        :pageName.sync="pageName"
        :popoverLabelData="popoverData"
        :userButtonCodesData="userButtonCodes"
        @refreshTable="getList()"
        :tableData="tableData">
      </table-box>
    </div>

    <dialog-form
      :formVisible.sync="dialogFormData.dialogVisible"
      :dialogFormData="dialogFormData"
      :dialogDataDefault.sync="dialogData"
    >
    </dialog-form>
  </div>
</template>

<script>
  import searchForm from '@/views/temp/searchForm'
  import tableBox from '@/views/temp/tableBox'
  import dialogForm from '@/views/temp/dialogForm'
  import { fileImport, exportMarketGoodsUnit } from '@/utils/publicSever';

  export default {
    name: 'commodity-item-new',
    components: {
      searchForm,
      tableBox,
      dialogForm
    },
    /**
     //input
     * key : key和id相等
     * elemType : 设置input框类型
     * defaultValue : 默认值
     * name : input框头部显示名称
     * labelWidth : input框头部宽度 默认是30% 可以不填
     //select
     * colValue : 下拉列表的value值
     * colName  : 下拉列表的label值
     * child : 下拉数据
     * */
    data() {
      return {
        /*************************** 表格模块 *********************************/
        /* 左侧按钮 */
        /***
         * type : 按钮显示类型
         * size : 按钮大小
         * value : 名字
         * elemType : 按钮类型
         * method : 方法
         * */

        /*字段设置必须值*/
        pageName: 'commodityItem',  //字段设置请求值 当页面文件名
        popoverData: [],
        tableShow: [],   //显示的字段
        userButtonCodes: {}, //权限按钮
        /*字段设置结束*/

        /* 表格数据源 */
        tableData: [],

        paginationData: {},//分页的数据
        selectData: [], //勾选数据1
        loading: false,

        /**
         * 表头数据
         * prop : 数据源绑定值
         * label : 表头label值
         * linkType : 是否能点击 true 或 false 默认false
         * method : 点击方法
         * */
        formDataLabel: [
          {
            prop: '1',
            label: '敏感词'
          },
          {
            prop: '2',
            label: '操作'
          }
        ],
        /* 表格数据 */
        /*************************** 弹窗表单 *********************************/
        dialogData: {},
        dialogFormData: {
          formData: {},
          dialogVisible: false,
          title: '添加会员卡',
          width: '30%',
          labelWidth: '1000px',
          position:'top',
          top: '10%',
          disabled: false,
          //底部按钮配置
          bottomBtn: [{
            value: '取消',
            loading: 'submitLoading',
            type: 'primary',
            size: 'small',
            method: (_this, formName) => {
              this.dialogFormData.dialogVisible = false;
              _this.$refs[formName].resetFields();
            }
          }, {
            value: '保存',
            loading: 'submitLoading',
            className: 'btn-active',
            type: 'primary',
            size: 'small',
            method: (_this, formName) => {
              _this.$refs[formName].validate((valid) => {
                if (valid) {
                  saveOrUpdate(this.dialogData).then(res => {
                    if (res.data.status) {
                      this.$message({
                        message: res.data.message,
                        type: 'success'
                      });
                      this.dialogFormData.dialogVisible = false
                      this.getList();
                    }
                  })
                } else {
                  return false;
                }
              });
            }
          }],
          formModel: [
            {
              key: '1',
              elemType: 'input',
              type:'textarea',
              rows:'7',
              name: '批量导入敏感词(请使用逗号分割,如"a,b,c")',
              maxlength: '30',
              rules: this.filter_rules({ required: true })
            },
          ]
        }
      }
    },
    methods: {

      getList(val) {
        if (val) {
          this.paginationData.p = 1;
          data.p = 1;
        }
      },
      openDialog(){
        this.dialogFormData.disabled = false;
        this.dialogFormData.title = '添加敏感词';
        this.dialogFormData.dialogVisible = true;
      }

    },
    created() {
      let array = [];
      for (let obj of this.formDataLabel) {
        array.push(obj.label)
      }
      this.tableShow = array;
      this.popoverData = array;
      this.getList();
    },
    mounted() {
      // console.log(this.dialogData)
    }
  }
</script>

<style scoped lang="scss">
  .main-box{
    border:1px solid rgba(221, 221, 221, 0.5);
    border-radius: 4px;
    background: #ffffff;
    padding: 10px;
  }
  .boxTitle {
    border-left: 3px solid #05ccce;
    padding-left: 10px;
    font-size: 15px;
    margin-bottom: 10px;
  }
  .div-table-box{
    padding: 20px;
  }
  .div-table-box-header{
    padding-top: 10px;
    border:solid rgba(221, 221, 221, 0.5);
    border-width: 1px 1px 0 1px;
    margin-bottom: -2px;
    background: #ffffff;
    transform: translateZ(100px);
    .box-header-title{
      padding: 0 20px 10px;
      border-bottom: 1px solid rgba(221, 221, 221, 0.5);;
    }
    .add{
      padding: 30px 20px 0;
    }
  }
</style>
