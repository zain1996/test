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
    name: 'userStudentList',
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
            name: '分类',
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
        leftButton: [
          {
            type: 'primary',
            size: 'small',
            id: 'add',
            value: '新增',
            elemType: 'button',
            method: (scope) => {
              let addData = {
                name: '新增app资讯',
                data: {
                  title: '新增app资讯'
                },
                component: modify
              }
              this.$root.hubBus.$emit('menuClick', addData)
            }
          },
          {
            type: 'primary',
            size: 'small',
            id: 'delete',
            value: '删除',
            class: 'btn-warning',
            elemType: 'button',
            method: (scope) => {
              let selectData = this.selectData;
              let data = { deleteFlag: true, ids: [] }
              if (selectData.length <= 0) {
                this.$message({
                  message: '请勾选要删除的表格',
                  type: 'warning'
                });
              } else {
                selectData.forEach(res => {
                  data.ids.push(res.id)
                });
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
              }
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
        popoverData: [],
        tableShow: [],   //显示的字段
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
            label: '标题'
          },
          {
            prop: '2',
            label: '分类'
          },
          {
            prop: '3',
            label: '状态',
            formatter: function(row, col, colVal) {
            }
          },
          {
            prop: '4',
            label: '点击量',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '5',
            label: '创建人'
          },
          {
            prop: '6',
            label: '操作时间'
          },
          {
            prop: '7',
            label: '操作栏',
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
      let array = [];
      for (let obj of this.formDataLabel) {
        array.push(obj.label)
      }
      this.tableShow = array;
      this.popoverData = array;
      this.getList();
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
