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
          },
          {
            key: '1',
            elemType: 'select',
            name: '学习类型',
            colValue: 'value',
            colName: 'label'
          }, {
            key: '2',
            elemType: 'input',
            name: '学习次数编号',
          },
        ],

        /*************************** 表格模块 *********************************/
        // /* 右侧按钮 */
        // rightButton: [{
        //   type: 'primary',
        //   size: 'small',
        //   id: 'fieldSetting',
        //   elemType: 'popover'
        // }],

        /*字段设置必须值*/
        pageName: 'commodityItem',  //字段设置请求值 当页面文件名
        popoverData: ['姓名', '电话号码', '学习次数编号', '所属驾校', '学习类型', '签到时间', '签到照片', '随机照片', '签退时间',
          '签退照片','有效学时','状态','上传状态','备注'],
        tableShow: ['姓名', '电话号码', '学习次数编号', '所属驾校', '学习类型', '签到时间', '签到照片', '随机照片', '签退时间',
          '签退照片','有效学时','状态','上传状态','备注'
        ],   //显示的字段
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
            label: '姓名'
          },
          {
            prop: '2',
            label: '电话号码'
          },
          {
            prop: '3',
            label: '学习次数编号',
            minWidth:'120',
            formatter: function(row, col, colVal) {
            }
          },
          {
            prop: '4',
            label: '所属驾校',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '5',
            label: '学习类型'
          },
          {
            prop: '6',
            label: '学习课程'
          },
          {
            prop: '7',
            label: '签到时间',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '9',
            label: '签到照片',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '10',
            label: '随机照片',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '11',
            label: '签退时间',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '12',
            label: '签退照片',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '13',
            label: '有效学时',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '14',
            label: '状态',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '15',
            label: '上传状态',
            formatter(row, col, colVal) {
            }
          },
          {
            prop: '16',
            label: '备注',
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
