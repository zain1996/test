<!--
    新修改的商品单元页面
-->
<template>
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
</template>

<script>
  import tableBox from '@/views/temp/tableBox'
  import { fileImport, exportMarketGoodsUnit } from '@/utils/publicSever';

  export default {
    name: 'order',
    components: {
      tableBox
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
            label: '订单编号'
          },
          {
            prop: '2',
            label: '下单时间'
          },
          {
            prop: '3',
            label: '课程名称',
          },
          {
            prop: '4',
            label: '订单金额',
          },
          {
            prop: '5',
            label: '支付金额'
          },
          {
            prop: '6',
            label: '支付方式'
          },
          {
            prop: '7',
            label: '支付状态'
          },
          {
            prop: '8',
            label: '订单状态'
          },
          {
            prop: '9',
            label: '备注'
          },
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
