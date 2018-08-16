``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9530
npm run dev

├── build                      // 构建相关
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                      // 第三方不打包资源
│   ├── region                 // 城市级联数据
├── theme                       // 主题
├── .babelrc                    // babel-loader 配置
├── eslintrc.js                 // eslint 配置项
├── .gitignore                  // git 忽略项
├── favicon.ico                 // favicon图标
├── index.html                  // html模板
└── package.json                // package.json

#每个页面的按钮都要加一个id，以便于后端权限的配置

/* 字段设置 start*/

//引入
import clzPopover from '@/components/Popover';

//注册
export default{
    components: {
        clzPopover
    }
}

//HTML
<clz-popover :formDataLabel="formDataLabel" :tableShow="tableShow" :tableKey="tableKey" @tableShow="val => tableShow = val" @tableKey="tableKey = arguments[0]"></clz-popover>

//JS
tableKey: 0,    //表格刷新key
formDataLabel:[ '用户角色', '状态', '角色权限', '创建时间','备注'],   //表头数据 表头label
tableShow:[],   //显示的字段

/* 字段设置 end */

/* 流程审核 start */
参考页面 views/licensing/infoChangeMg/derateApply
审核可以多选 开始审核时需要先调用接口验证是否可以审核
/* 流程审核 end */


/******** 常用模板代码 START*****************************************/
--------------------- 三元表达式嵌套 ----------------------------
 <!--0：直营、1：加盟、2：租入-->
<template slot-scope="scope">
    {{(scope.row.type <= 1) ? (scope.row.type < 1 ?'直营':'加盟') : '租入'}}
</template>
------------------------ 日期格式化 ---------------------------
<template slot-scope="scope">
    <span >{{scope.row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
</template>
---------------------- 分页 -----------------------------
getList(){
    let obj = {};
    obj.p = this.currentPage;
    obj.s = this.pageSize;
    ......
}

----------------- 合计表格 Bug 修复 ------------------------

let fixedSums = [];
for(let i in sums){
    if(sums[i] !== ""){
        fixedSums.push(parseFloat(sums[i]).toFixed(2));
    }

}
放到 return sums; 前面
--------------- reset 重置按钮--------------------
reset() {    //重置按钮事件

    for(let item in this.formData){
        this.formData[item] = '';
    }
},
----------------Dialog 属性修改--------------------
:visible.sync="addFormVisible"  width="33%"
-----------Title---------------------
<div class="title-tab">各门店指标</div>
<div class="title">新增片区招生指标</div>
<style>
    .title {
        background: #ffffff;
        padding: 10px;
        font-size: 14px;
        color: #41bdc7;
        border: 1px solid rgba(221, 221, 221, 0.50);
    }
   .title-tab{
        margin-top: 10px;
        margin-bottom: 10px;
        background: #FAFAFA;
        padding: 10px;
        font-size: 14px;
        color: #000000;
        border: 1px solid rgba(221, 221, 221, 0.50);
    }
</style>
--------------模板组件------------------
import areaRecruitDetails from './areaRecruitDetails.vue';
import areaRecruitAdd from './areaRecruitAdd.vue';

components: { //自定义模板
            areaRecruitDetails,
            areaRecruitAdd,
},

<div class="table-pane-box">
      <el-tabs type="border-card">
            <el-tab-pane label="片区招生指标">
                    <areaRecruitDetails></areaRecruitDetails>
           </el-tab-pane>
      </el-tabs>
</div>

 preview(){  // 查看
     let data = {
           component: areaRecruitDetails,
             name: '片区招生指标详情',
             isRefresh:true  //是否刷新
     };
    this.$root.hubBus.$emit('menuClick', data);
},
---------------必填/禁止修改的表单-----------------
<el-form-item label="性别" label-width="24%" :rules="[{required:true, message:'必填'}]">
    	<el-input v-model="formData.value06"  placeholder="请输入" :disabled="true"></el-input>
</el-form-item>
----------------单元格点击事件----------------
<template slot-scope="scope">
	<span class="link-type" @click="lvTwoClick()">{{scope.row.value01}}</span>
</template>
----------------按钮灰色----------------
<el-form-item>
          <el-button type="primary" size="small" @click="addSubmitTwo" id="addSubmitTwo" class="btn-active" :disabled="!editFormFlag">添加</el-button>
</el-form-item>

加入 class="btn-warning"  显示为红色警告按钮

----------------展示----------------
<el-form>
     <el-form-item label="报名日期：" label-width="30%">
          {{formData.value01}}
   </el-form-item>
</el-form>
-----------------单选框---------------
<el-row :span="24" >
 <el-col :span="24">
    <el-form-item label="收费标准：" labelWidth="1%"  :rules="[{required:true, message:'必填'}]">
         <el-radio-group v-model="chargeType" :change="hasMoney()">
              <el-radio :label="1">无</el-radio>
          <el-radio :label="2">有</el-radio>
     </el-radio-group>
   </el-form-item>
  </el-col>
</el-row>

hasMoney(){
    if(this.chargeType === 1){
        this.changeTypeVisible = false;
    }else if(this.chargeType === 2){
        this.changeTypeVisible = true;
    }
},
-----------------选项框---------------------
<el-col :span="6">
    <el-form-item label="商品属性" label-width="30%">
        <el-select v-model="formData.search01" placeholder="请选择">
            <el-option v-for="item in formSelect.search01" :key="item.value"
                       :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
</el-col>
-----------------单日期---------------
<el-form-item label="选择节点日期：" label-width="5%" :rules="[{required:true, message:'必填'}]">
    <el-date-picker
            v-model="timeSelect"
            type="date"
            placeholder="选择日期"
            class="dataMargin"
            >
    </el-date-picker>
</el-form-item>
------------------双日期--------------

   <el-col :span="6" class="double">
        <div class="nowrap">
            <el-form-item label="录入日期" label-width="30%" prop="createdAt">
                    <el-date-picker
                            v-model="formData.createdAt"
                            type="date"
                            placeholder="选择日期"
                            class="dataMargin"
                            align="left"
                            >
                    </el-date-picker>
                    <el-date-picker
                            v-model="formData.endDate"
                            type="date"
                            placeholder="选择日期"
                            align="left"
                            >
                    </el-date-picker>
                <el-form-item style="display: none" prop="endDate"></el-form-item>
            </el-form-item>
        </div>
    </el-col>

------------------月份选择--------------
<div class="nowrap">
    <el-form-item label="月份" label-width="30%"  :rules="[{required:true, message:'必填'}]">
        <el-date-picker v-model="valueMonth" type="month" placeholder="选择月" :disabled="formEditFlag">
        </el-date-picker>
    </el-form-item>
</div>
-----------------弹出 Dialog---------------
<<el-dialog :append-to-body="true" title="教练列表" v-model="itemDetailsFormVisible" :close-on-click-modal="true" size="tiny" top="20%">
    <div class="fromBox">
        <el-form :model="itemDetailsForm" label-width="23%" ref="itemDetails">



        </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click.native="addSubmit" :loading="addLoading" class="btn-active">保存</el-button>
        <el-button type="primary" size="small" @click.native="itemDetailsFormVisible = false">取消</el-button>
    </div>
</el-dialog>

Dialog 的大小 tiny/small/large/full

------------------编辑 父子页面传值-------------------------
*** 父:

data{
    return {
        Selected: [], //列表选中列
    },
    methods: {

        edit() {     //编辑按钮事件
            let sels = this.Selected;
            let _this = this;
            if(sels.length>=2){
                this.$message({
                    message: '不能同时编辑两条',
                    type: 'warning'
                });
            }else if(sels.length<=0){
                this.$message({
                    message: '请勾选要编辑的表格',
                    type: 'warning'
                });
            }else{
                /*开启新窗口*/
                this.$store.state.columns.tableData = sels;
                let data = {
                    component: commodityDetails,
                    name:'商品编辑 ', // +sels[0].title
                    isRefresh:true  //是否刷新
                    tabsData:{ id: id,name: name} //开启窗口携带值，以对象传
                };
                this.$root.hubBus.$emit('menuClick',data);
            }
        },

    }
}

*** 子:

mounted() {
    if(typeof(this.$store.state.columns.tableData) != 'undefined'){
        this.editForm = Object.assign({}, this.$store.state.columns.tableData[0]);
        console.log(this.editForm);
    }
},
--------------------单选框 Radio----------------------------------

具体查看: src/views/marketing/commodityMgr/subPage/selectSetMeal.vue

<!-- 循环表头数据 方便显示隐藏列表 -->
<el-radio-group v-model="radio" @change="radioChecked">
    <template v-for="tab in tableShow" >
        <el-table-column align="center" width="55">
            <template scope="scope"><el-radio class="radio" v-model="radio" :label="scope.row.radio" ></el-radio></template>
        </el-table-column>

        <el-table-column align="center" :label="formDataLabel[0]" v-if="tab==formDataLabel[0]" prop="value01">
        </el-table-column>

    </template>
</el-radio-group>

data{
    return {
        radio: '1', // 单选
        tableData: [{
            value01:'车管所受理',
            radio: '1'
        },{
            value01:'科目一考试',
            radio: '2'
        }],
    }
},
methods: {
    radioChecked(){
        console.log(this.radio);
    }
},

----------------------取消勾选框所有选择-----------------------------------
<el-table  ... ref="multipleTable" ... ></el-table>

方法中:
this.$refs.multipleTable.clearSelection();
---------------------------------------------------------------------

本地存储localStorage的封装
http://geek.csdn.net/news/detail/62484  //API地址

let localStorage = require('storejs').default;

localStorage.set('nick',data) //设置缓存
localStorage("nick")    //获取缓存

########## 示例 posMachineMg.vue ##########
    // 载入全局方法
    <script> let localStorage = require('storejs').default;  </script>

    // 根据 key 取中文释义显示到表格中
    this.tableData[0].posType =localStorage("loadDictCache").pos_company[res.data.data[i].posType];
    // 从缓存中获取字典数据 pos_company ; 字典见开发者工具 Application-->Storage
    created: function () {
        this.formSelect.posType = this.parseObj(localStorage("loadDictCache").pos_company);
    }
##########################################
----------------------  父子页面传值并关闭子页面  -----------------------------------
例子：http://localhost:9530/#/traffic/infoManage/basisInfo
//父级页面接收子级页面的刷新请求,并返回了子级页面的数据
this.$root.hubBus.$on('refresh',function(menu){
                        console.log('刷新了',menu)
                        this.getList();
                    }.bind(this));

//子级页面关闭页面,并把子页面的数据返回父级页面
let data ={
            closeTabs:'车辆信息录入',     //关闭页面的名字
            backTabs:'车辆基础信息管理',   //要返回父页面的名字
            subPageData:'我是子页面数据',  //子页面数据传给父级
            id:'refresh',//区分页面名称   用于填父级页面名称  子页面调用
          };
this.$root.hubBus.$emit('closeWindow',data);
this.$root.hubBus.$destroy('closeWindow');   //销毁事件
tableData:indexCount

#获取本地缓存片区
let localStorage = require('storejs').default;
this.formSelect.area= this.parseList(localStorage("loadOrgCache").orgAreaMap[localStorage("userInfo").userInfo.schoolId]);

this.exportFile(this.formData)  //this.formData是导出的查询值
window.location = window._Host.BASE_API + window._Host.BASE_CONTEXT+'/fin/finPos/export'+ this.exportFile(this.formData);

----------------------  表格合并  -----------------------------------

this.tableMerge('tab','4')   //第一个值：表格ID，第二个值：要合并多少列 （最后一列不能合并）

----------------------  input 监听  -----------------------------------
参考:　src/views/licensing/certificateHall/changeSchool.vue
add(){  // 新增按钮
    this.addFormVisible = true;
    let set = setInterval(function(){   // 定时器
        $("#aaa").bind('input propertychange', function() { // 绑定id="aaa"
            console.log($("#aaa").val())
        });
        clearInterval(set); // 销毁定时器
    },200);
}

----------------------  搜索表单  -----------------------------------

http://192.168.199.246:9530/#/operation/searchTable

----------------------  导入excel  -----------------------------------
http://localhost:9530/#/finance/tradeMg/posSwingCardMg

-------------------------- 数组合并 -----------------------------------
Object.assign(this.tableData, checkedList);

--------------------------  清空表单 -----------------------------------

http://localhost:9530/#/licensing/payExamMg/examMg


------------------------ 删除 二次确认----------------------------
this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading = true;

                        确定的回调

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
------------------------ 重置form表单obj (只针对全是obj数据处理)----------------------------
reset(){    //重置按钮事件
    this.deleteObj(this.formData);
},

------------------------ 批量停用启用 ----------------------------
this.enabledDisabled(this.Selected,true,updateCertProjectSetState);   //选中值，启用停用，请求

----------------------- 第二次开启新增窗口时初始化校验 -----------------------


建议使用 :key 方式, 以下方式仍存在 bug

addSubmitCanter(){
    this.addFormVisible = true;
    this.$refs.addForm.resetFields();
}

<<el-dialog :append-to-body="true"  .... @close="addSubmitCanter()">

-----------------------------------------------------------------------------


/******** 常用模板代码 END*****************************************/
