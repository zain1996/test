<!--
    新修改的商品单元页面
-->
<template>
  <div class="main-box" clz-type="table">
    <!--
        搜索表单：
        searchModel : 表单数据集合
        formData.sync ：表单输出值
        @refreshTable : 查询按钮事件
    -->
    <search-form
      :formModel="searchModel"
      :formDataDefault.sync="formData"
      @refreshTable="getList(1)">
    </search-form>
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
    <table-box
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
      let _this = this;
      return {
        /*************************** 表单模块 *********************************/
        formData: { //搜索表单值
          p: 1,
          s: 10
        },
        downLoadFormData: {},
        //搜索表单数据
        searchModel: [
          {
            key: '1',
            elemType: 'select',
            name: '所属驾校',
            colValue: 'value',
            colName: 'label'
          },
          {
            key: '2',
            elemType: 'select',
            name: '激活状态',
            colValue: 'value',
            colName: 'label'
          },
          {
            isGroup: true,
            name: '关键词',
            children: [
              {
                key: '6',
                elemType: 'select',
                colValue: 'value',
                width: '90px',
                colName: 'label',
                defaultValue: '',
                child: this.exportArray(cache.loadDictCache.goods_unit_usage)
              },
              {
                key: '7',
                width: '180px',
                elemType: 'input',
                name: '关键词'
              }
            ]
          }
        ],

        /*************************** 表格模块 *********************************/
        /* 左侧按钮 */
        /***
         * type : 按钮显示类型
         * size : 按钮大小
         * value : 名字
         * elemType : 按钮类型
         * method : 方法
         * */

        //一般按钮
        leftButton: [{
          type: 'primary',
          size: 'small',
          id: 'add',
          value: '新增',
          elemType: 'button',
          method: (scope) => {
            this.dialogFormData.disabled = false;
            this.dialogFormData.title = '添加会员卡';
            this.dialogFormData.dialogVisible = true;
          }
        },
          {
            type: 'primary',
            size: 'small',
            id: 'enable',
            value: '启用',
            elemType: 'button',
            method: (scope) => {
              let selectData = this.selectData;
              this.enabledDisabled(selectData, false, updateStatus)
            }
          },
          {
            type: 'primary',
            size: 'small',
            class: 'btn-warning',
            id: 'disable',
            value: '停用',
            elemType: 'button',
            method: (scope) => {
              let selectData = this.selectData;
              this.enabledDisabled(selectData, true, updateStatus)
            }
          }
          //上传按钮
          /* {
               elemType:'upload',
               showFileList:false,
               id:'upload',
               value:'导入',
               action:fileImport + this.$store.getters.access_token,
               showButton:true,
               onSuccess(response, file, fileList){
                   console.log(response, file, fileList)
               }
           }*/],
        /* 右侧按钮 */

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
            label: '卡号'
          },
          {
            prop: '2',
            label: '批次号',
          },
          {
            prop: '3',
            label: '激活码',
          },
          {
            prop: '4',
            label: '激活状态'
          },
          {
            prop: '5',
            label: '使用人'
          },
          {
            prop: '6',
            label: '手机号'
          },
          {
            prop: '7',
            label: '所属驾校'
          },
          {
            prop: '8',
            label: '激活时间'
          },
          {
            prop: '9',
            label: '使用状态'
          },
          {
            prop: '10',
            label: '备注'
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
          labelWidth: '20%',
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
          formModel: [{
            key: '1',
            elemType: 'input',
            name: '会员卡名称',
            maxlength: '30',
            rules: this.filter_rules({ required: true })
          }, {
            key: '2',
            elemType: 'select',
            name: '归属驾校',
            colValue: 'value',
            colName: 'label',
            child: this.exportArray(cache.loadDictCache.goods_unit_usage, false),
            rules: this.filter_rules({ required: true, type: 'select' })
          }, {
            key: '3',
            elemType: 'input',
            name: '数量',
            maxlength: '30',
            rules: this.filter_rules({ required: true })
          }, {
            key: '4',
            elemType: 'input',
            name: '有效期(天)',
            maxlength: '30',
            rules: this.filter_rules({ required: true })
          }]
        }
      }
    },
    methods: {

      getList(val) {
        let data = Object.assign(this.formData, this.paginationData);
        if (val) {
          this.paginationData.p = 1;
          data.p = 1;
        }
        this.downLoadFormData = this.clearObj(this.formData)
      }

    },
    created() {
      let array = [];
       for(let obj of this.formDataLabel){
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

<style scoped>

</style>
