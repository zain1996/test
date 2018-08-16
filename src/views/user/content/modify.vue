<template>
  <div class="main-box">
    <div class="form-box input-box-center">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <div class="boxTitle">{{title}}</div>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="区县行政区代码：" label-width="130px">
              <el-input placeholder="请输入区县行政区代码" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业编号：" label-width="130px">
              <el-input placeholder="请输入企业编号" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="企业名称：" label-width="130px">
              <el-input placeholder="请输入企业名称" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称：" label-width="130px">
              <el-input placeholder="请输入企业简称" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="营业执照注册号：" label-width="130px">
              <el-input placeholder="请输入营业执照注册号" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="营业许可编号：" label-width="130px">
              <el-input placeholder="请输入营业许可编号" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="营业许可日期：" label-width="130px">
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
          <el-col :span="6">
            <el-form-item label="邮政编码：" label-width="130px">
              <el-input placeholder="请输入邮政编码" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="企业地址：" label-width="130px">
              <el-select style="width: 100px" v-model="selected">
                <el-option label="深圳市" value="0"></el-option>
              </el-select>
              <el-select style="width: 100px" v-model="selected">
                <el-option label="福田区" value="0"></el-option>
              </el-select>
              <el-input placeholder="请输入详细地址" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法人代表：" label-width="130px">
              <el-input placeholder="请输入法人代表" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="联系人：" label-width="130px">
              <el-input placeholder="请输入联系人" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话：" label-width="130px">
              <el-input placeholder="请输入联系电话" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="经营范围：" label-width="130px">
              <el-checkbox-group>
                <el-checkbox label="A1"></el-checkbox>
                <el-checkbox label="A2"></el-checkbox>
                <el-checkbox label="A3"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="企业简介：" label-width="130px">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="机构图标：" label-width="130px">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
    name: 'contentModify',
    props: ['tabsData'],
    data() {
      return {
        selected: '0',
        date: ''
      }
    },
    mounted() {
    },
    methods: {
      close() {
        let closeDada = {
          backTabs: '学员管理',
          closeTabs: '新增学员'
        }
        this.$root.hubBus.$emit('closeWindow', closeDada);
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
  .main-box {
    .boxTitle {
      border-left: 3px solid #05ccce;
      padding-left: 10px;
      font-size: 15px;
    }
  }

  .item {
    width: 280px;
    display: inline-block;
    float: left;
  }

  .itemBtn {
    display: inline-block;
    float: left;
    margin-left: 10px;
  }

  .tableBox {
    border: 1px solid #e6ebf5;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    border:1px solid #c0c4cc
  }
  .avatar {
    width: 120px;
    height: 90px;
    display: block;
  }
</style>