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

  </div>
</template>

<script>
  import searchForm from '@/views/temp/searchForm'
  import tableBox from '@/views/temp/tableBox'
  import dialogForm from '@/views/temp/dialogForm'
  import { fileImport, exportMarketGoodsUnit } from '@/utils/publicSever';
  import modify from './modify'
  export default {
    name: 'userContentList',
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
            name: '所属城市',
            colValue: 'value',
            colName: 'label'
          }, {
            key: '2',
            elemType: 'select',
            name: '状态',
            colValue: 'value',
            colName: 'label'
          }, {
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
        leftButton: [
          {
            type: 'primary',
            size: 'small',
            id: 'add',
            value: '新增',
            elemType: 'button',
            method: (scope) => {
              let addData = {
                name: '新增驾校',
                data: {
                  title:'新增驾校'
                },
                component: modify,
              }
              this.$root.hubBus.$emit('menuClick',addData)
            }
          },
          {
            type: 'primary',
            size: 'small',
            id: 'edit',
            value: '编辑',
            elemType: 'button',
            method: (scope) => {
              let selectData = this.selectData;
              if (selectData.length >= 2) {
                this.$message({
                  message: '不能同时编辑多条',
                  type: 'warning'
                });
              } else if (selectData.length <= 0) {
                this.$message({
                  message: '请勾选要编辑的表格',
                  type: 'warning'
                });
              } else {
                this.dialogFormData.disabled = false;
                this.dialogFormData.title = '编辑商品单元';
                this.dialogFormData.dialogVisible = true;
              }
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
        ],
        // /* 右侧按钮 */
        // rightButton: [{
        //   type: 'primary',
        //   size: 'small',
        //   id: 'fieldSetting',
        //   elemType: 'popover'
        // }],

        /*字段设置必须值*/
        pageName: 'commodityItem',  //字段设置请求值 当页面文件名
        popoverData: ['企业名称', '所属城市', '联系方式', '地址', '法人代表', '状态', '学员数', '创建人', '创建时间'],
        tableShow: ['企业名称', '所属城市', '联系方式', '地址', '法人代表', '状态', '学员数', '创建人', '创建时间'],   //显示的字段
        userButtonCodes: false, //权限按钮
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
            label: '企业名称'
          },
          {
            prop: '2',
            label: '所属城市'
          },
          {
            prop: '3',
            label: '联系方式',
            formatter: function(row, col, colVal) {
            }
          },
          {
            prop: '4',
            label: '地址',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '5',
            label: '法人代表'
          },
          {
            prop: '6',
            label: '状态'
          },
          {
            prop: '7',
            label: '学员数',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '9',
            label: '创建人',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '10',
            label: '创建时间',
            formatter(row, col, colVal) {
            }
          }
        ]
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
      this.getList();
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
