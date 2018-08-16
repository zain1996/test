<template>
  <div class="main-box">
    <div class="form-box input-box-center">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <div class="boxTitle">{{title}}</div>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="所属课目：" label-width="130px">
              <el-select v-model="selected">
                <el-option label="科目三" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="名称：" label-width="130px">
              <el-input placeholder="请输入名称" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item label="图标：" label-width="130px">
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
            <el-form-item label="上传音频：" label-width="130px">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="[]">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :push="2" :span="24">
            <el-button type="primary" size="small" @click="addInfo" :disabled="isAddInfo">添加详解</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div style="float: left" v-for="(v,k) in data">
        <div v-if="!v.isUpdate" class="lighting-add-info">
          <p>{{v.title}}</p>
          <p>答案：{{v.answer}}</p>
          <p>讲解：{{v.explain}}</p>
          <div class="lighting-add-info-btn">
            <el-button type="small" @click="updateInfo(v,k)">编辑</el-button>
            <el-button type="small" @click="deleteInfo(v,k)">删除</el-button>
          </div>
        </div>
        <el-form v-else :inline="true" :model="formData" ref="formData" class="demo-form-inline moreItem">
          <el-row :span="24">
            <el-col :span="24">
              <el-form-item label="题目：" label-width="100px">
                <el-input placeholder="请输入题目" :maxlength="20" v-model="formData.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="24">
              <el-form-item label="操作图片：" label-width="100px">
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
              <el-form-item label="答案：" label-width="100px">
                <el-input placeholder="请输入答案" :maxlength="20" v-model="formData.answer"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="24">
              <el-form-item label="讲解：" label-width="100px">
                <el-input type="textarea" resize="none" rows="4" placeholder="请输入答案" :maxlength="20" v-model="formData.explain"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="24" style="text-align: center">
              <el-button type="primary" size="small" class="btn-active" @click="saveInfo(v,k)">确定</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="clear: both"></div>
      <div style="text-align: center;margin-top: 10px;">
        <el-button type="primary" size="small" @click.native="close()">取消</el-button>
        <el-button type="primary" size="small" class="btn-active">确定</el-button>
      </div>
    </div>
    <!--{{data}}-->
  </div>
</template>

<script>
  export default {
    name: 'studentModify',
    props: ['tabsData'],
    data() {
      return {
        selected: '0',
        data: [
        ],
        formData:{
          answer:'',
          title:'',
          explain:''
        },
        isAddInfo:false
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
      },
      addInfo(){
        let data = {
          isUpdate: true
        };
        this.data.push(data)
        this.formData.title = '';
        this.formData.answer= '';
        this.formData.explain= '';
        this.isAddInfo = true
      },
      updateInfo(value,index){
        if(this.isAddInfo === true){
          return
        }
        this.formData.title = value.title;
        this.formData.answer= value.answer;
        this.formData.explain= value.explain;
        value.isUpdate = true;
        this.isAddInfo = true
      },
      saveInfo(value,index){
        value.title = this.formData.title;
        value.answer = this.formData.answer;
        value.explain = this.formData.explain;
        value.isUpdate = false
        this.isAddInfo = false
      },
      deleteInfo(value,index){
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.data.splice(index,1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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

  .demo-form-inline {
    width: 50%;
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

  .moreItem {
    margin: 10px 0 0 50px;
    padding: 10px;
    width: 600px;
    border: 2px dashed rgba(221, 221, 221, 1)
  }

  .lighting-add-info {
    position: relative;
    overflow: hidden;
    width: 600px;
    margin: 10px 0 0 50px;
    padding: 10px;
    border: 1px solid rgba(221, 221, 221, 1);
    .lighting-add-info-btn {
      background: #80919fab;
      text-align: center;
      padding: 10px 0;
      position: absolute;
      transition: .2s;
      bottom: -100px;
      left: 0;
      right: 0;
    }
    &:hover {
      .lighting-add-info-btn {
        transform: translateY(-100px);
      }
    }
  }
</style>