<template>
  <div class="main-box">
    <div class="form-box input-box-center">
      <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
        <div class="boxTitle">规则设置</div>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="总体数：" label-width="100px" >
              <el-input placeholder="请输入总体数" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合格分数：" label-width="30%"  >
              <el-input placeholder="请输入合格分数" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="考试时间：" label-width="30%"  >
              <el-input class="width-200px" placeholder="请输入考试时间" :maxlength="20"></el-input>
              <span>分钟</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="boxTitle">题型占比</div>
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="单选题：" label-width="100px" >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="判断题：" label-width="30%"  >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="多选题：" label-width="30%"  >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="14">
            <el-form-item label="1.安全行车常识：" label-width="300px" >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="14">
            <el-form-item label="2.文明行车常识：" label-width="300px" >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="14">
            <el-form-item label="3.道路交通信号在交通场景中的综合应用：" label-width="300px" >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="14">
            <el-form-item label="4.恶劣气象和复杂道路条件下安全驾驶知识：" label-width="300px" >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="14">
            <el-form-item label="5.紧急情况下避险常识：" label-width="300px" >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="14">
            <el-form-item label="6.典型事故案例分析：" label-width="300px" >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="14">
            <el-form-item label="7.交通事故救护及常见危险化学品处置常识：" label-width="300px" >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="14">
            <el-form-item label="8.地方试题：" label-width="300px" >
              <el-input class="width-200px" placeholder="请输入题型占比" :maxlength="20"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin-top: 10px;">
        <el-button type="primary" size="small" class="btn-active">保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test1',
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

    },
    computed: {

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
    width: 300px;
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
  .form-box{
    border:0;
  }
  .width-200px{
    width: 200px;
  }
  span{
    color: #606266;
  }
</style>