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
            name: '所属章节',
            colValue: 'value',
            colName: 'label',
            child: this.exportArray(cache.loadDictCache.goods_unit_usage)
          },
          {
            key: '2',
            elemType: 'select',
            name: '题型',
            colValue: 'value',
            colName: 'label',
            child: this.exportArray(cache.loadDictCache.goods_unit_usage)
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
              this.dialogFormData.disabled = false;
              this.dialogFormData.title = '添加会员卡';
              this.dialogFormData.dialogVisible = true;
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
          },
          //上传按钮
          {
            elemType: 'upload',
            showFileList: false,
            id: 'upload',
            value: '批量导入',
            action: fileImport + this.$store.getters.access_token,
            showButton: true,
            onSuccess(response, file, fileList) {
              console.log(response, file, fileList)
            }
          }
        ],
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
            label: '所属城市'
          },
          {
            prop: '2',
            label: '所属章节'
          },
          {
            prop: '3',
            label: '题型'
          },
          {
            prop: '4',
            label: '类型'
          },
          {
            prop: '5',
            width: '100px',
            label: '其他类型'
          },
          {
            prop: '6',
            label: '所属微课编号'
          },
          {
            prop: '7',
            label: '难度系数'
          },
          {
            prop: '8',
            width: '100px',
            label: '分数'
          },
          {
            prop: '9',
            label: '题目内容'
          },
          {
            prop: '10',
            label: '创建人'
          },
          {
            prop: '11',
            label: '创建时间'
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
          formModel: [
            {
              key: '0',
              elemType: 'select',
              name: '科目',
              colValue: 'value',
              colName: 'label',
              child: this.exportArray(cache.loadDictCache.goods_unit_usage, false),
              rules: this.filter_rules({ required: true, type: 'select' })
            },
            {
              key: '01',
              elemType: 'select',
              name: '所属城市',
              colValue: 'value',
              colName: 'label',
              child: this.exportArray(cache.loadDictCache.goods_unit_usage, false),
              rules: this.filter_rules({ required: true, type: 'select' })
            },
            {
              key: '02',
              elemType: 'select',
              name: '章节',
              colValue: 'value',
              colName: 'label',
              child: this.exportArray(cache.loadDictCache.goods_unit_usage, false),
              rules: this.filter_rules({ required: true, type: 'select' })
            },
            {
              key: '2',
              elemType: 'select',
              name: '题型',
              colValue: 'value',
              colName: 'label',
              child: this.exportArray(cache.loadDictCache.goods_unit_usage, false),
              rules: this.filter_rules({ required: true, type: 'select' })
            },
            {
              key: '2',
              elemType: 'select',
              name: '类型',
              colValue: 'value',
              colName: 'label',
              child: this.exportArray(cache.loadDictCache.goods_unit_usage, false),
              rules: this.filter_rules({ required: true, type: 'select' })
            },
            {
              key: '1',
              elemType: 'checkbox',
              name: '所属科目',
              child: [
                {
                  label: '时间题',
                  value: '1'
                },
                {
                  label: '速度题',
                  value: '2'
                },
                {
                  label: '距离题',
                  value: '3'
                },
                {
                  label: '罚款题',
                  value: '4'
                }
              ],
              rules: this.filter_rules({ required: true })
            },
            {
              key: '21',
              elemType: 'input',
              name: '所属课件编号',
              maxlength: '30',
              rules: this.filter_rules({ required: true })
            },
            {
              key: '255',
              elemType: 'select',
              name: '附件图片',
              colValue: 'value',
              colName: 'label',
              child: this.exportArray(cache.loadDictCache.goods_unit_usage, false),
              rules: this.filter_rules({ required: true, type: 'select' })
            },
            {
              key: '211',
              elemType: 'upload',
              name: '图片',
              maxlength: '30',
              rules: this.filter_rules({ required: true })
            },
            {
              key: '41',
              elemType: 'select',
              name: '难度系数',
              colValue: 'value',
              colName: 'label',
              child: this.exportArray(cache.loadDictCache.goods_unit_usage, false),
              rules: this.filter_rules({ required: true })
            },
            {
              key: '4111',
              elemType: 'select',
              name: '分数',
              colValue: 'value',
              colName: 'label',
              child: this.exportArray(cache.loadDictCache.goods_unit_usage, false),
              rules: this.filter_rules({ required: true })
            },
            {
              key: '41231',
              elemType: 'input',
              name: '题目内容',
              rules: this.filter_rules({ required: true })
            },
            {
              key: '412314',
              elemType: 'input',
              name: '选项',
              rules: this.filter_rules({ required: true })
            },
            {
              key: '412312',
              elemType: 'input',
              name: '正确答案',
              rules: this.filter_rules({ required: true })
            },
            {
              key: '412313',
              elemType: 'input',
              name: '答案解析',
              rules: this.filter_rules({ required: true })
            },
          ]
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

<style scoped>

</style>
