<template>
  <div class="main-box">
    <div class="form-box input-box-center">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <div class="boxTitle">{{title}}</div>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="姓名：" label-width="30%" >
              <el-input placeholder="请输入商品名称" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别：" label-width="30%"  >
              <el-select v-model="selected">
                <el-option label="男" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="国籍：" label-width="30%" >
              <el-input placeholder="请输入国籍" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件类型：" label-width="30%"  >
              <el-select v-model="selected">
                <el-option label="身份证" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="证件号：" label-width="30%" >
              <el-input placeholder="请输入证件号" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话：" label-width="30%" >
              <el-input placeholder="请输入联系电话" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="联系地址：" label-width="116px" >
              <el-select  style="width: 100px"  v-model="selected">
                <el-option label="深圳市" value="0"></el-option>
              </el-select>
              <el-select style="width: 100px"  v-model="selected" >
                <el-option label="福田区" value="0"></el-option>
              </el-select>
              <el-input style="width: 421px" placeholder="请输入详细地址" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="邮政编码：" label-width="30%" >
              <el-input placeholder="请输入邮政编码" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务类型：" label-width="30%"  >
              <el-select v-model="selected">
                <el-option label="初领" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="培训车型：" label-width="30%" >
              <el-select v-model="selected" >
                <el-option label="C1" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册时间：" label-width="30%" >
              <el-date-picker
                v-model="date"
                align="right"
                type="date"
                format="yyyy - MM - dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="所属企业：" label-width="30%" >
              <el-select v-model="selected" >
                <el-option label="深港驾校" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属企业编号：" label-width="30%" >
             <el-input placeholder="请输入企业编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="所属城市：" label-width="30%" >
              <el-select v-model="selected" >
                <el-option label="深圳" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态：" label-width="30%" >
              <el-select v-model="selected" >
                <el-option label="启用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="类型：" label-width="30%" >
              <el-select v-model="selected" >
                <el-option label="已认证" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin-top: 10px;">
        <el-button type="primary" size="small" @click.native="close()">取消</el-button>
        <el-button type="primary" size="small" class="btn-active">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'studentModify',
    props: ['tabsData'],
    data() {
      return {
        selected:'0',
        date:''
      }
    },
    mounted() {
    },
    methods:{
      close(){
        let closeDada = {
          backTabs:'学员管理',
          closeTabs:'新增学员'
        }
        this.$root.hubBus.$emit('closeWindow',closeDada);
      }
    },
    computed: {
      title() {
        return this.tabsData.data.title
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main-box{
    .boxTitle{
      border-left: 3px solid #05ccce;
      padding-left: 10px;
      font-size: 15px;
    }
  }
  .item{
    width: 280px;
    display: inline-block;
    float: left;
  }
  .itemBtn{
    display: inline-block;
    float: left;
    margin-left: 10px;
  }
  .tableBox{
    border:1px solid #e6ebf5;
  }
</style>