<template>
  <div class="main-box">
    <div class="form-box input-box-center">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <div class="boxTitle">{{title}}</div>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="分类：" label-width="130px">
              <el-select v-model="selected">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item label="头图：" label-width="130px">
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
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="标题：" label-width="130px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="摘要：" label-width="130px">
              <el-input rows="7" resize="none" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="内容：" label-width="130px">
              <editor :content.sync="content"></editor>
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
  import editor from '@/components/editor/index'

  export default {
    name: 'studentModify',
    props: ['tabsData'],
    components: {
      'editor': editor
    },
    data() {
      return {
        selected: '0',
        date: '',
        content:''
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

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    border: 1px solid #c0c4cc
  }

  .avatar {
    width: 120px;
    height: 90px;
    display: block;
  }
</style>