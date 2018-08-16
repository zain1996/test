<template>
  <el-row class="commonProblemDetail warp">
    <el-col :span="24">
      <div class="title">详情</div>
      <div class="question">
        <div class="question-title">
          问题: 在哪里可以查看有效学时？
        </div>
        <div class="question-content">
          <div class="question-left">
            <p>解答：</p>
          </div>
          <div class="question-right">
            <p>点击【我的】可查看学习进度以及每次学习的相关记录；点击【我的】可查看学习进度以及每次学习的相关记录；</p>
            <p>点击【我的】可查看学习进度以及每次学习的相关记录；点击【我的】可查看学习进度以及每次学习的相关记录；点击
              【我的】可查看学习进度以及每次学习的相关记录；点击【我的】可查看学习
              进度以及每次学习的相关记录；点击【我的】可查看学习进度以及每次学习的相关记录；点击【我的】可查看学习进度以及每次学习的相关记录；</p>
          </div>
          <div style="clear: both"></div>
          <div class="question-bottom">
            <el-button type="primary" size="small">取消</el-button>
            <el-button type="primary" size="small" class="btn-active">编辑</el-button>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'detail'
  }
</script>

<style scoped lang="scss">
  .warp {
    background: #ffffff;
    overflow: hidden;
    border:1px solid rgba(221, 221, 221, 0.5);
    border-radius: 4px;
    padding: 20px;
  }

  .commonProblemDetail{
    .title{
      padding: 5px;
      font-size: 16px;
      background: #ffffff;
      border:0;
      border-left: 3px solid #05ccce;
    }
    .question{
      width: 600px;
      padding-left: 40px;
      margin-top: 10px;
    }
    .question-content{
      margin-top: 10px;
    }
    .question-left{
      float: left;
      p{
        margin: 0;
      }
    }
    .question-right{
      float: left;
      width: 500px;
      border:1px solid rgba(191, 205, 218, 1);
      padding: 0 20px;
    }
    .question-bottom{
      margin-top: 10px;
      text-align: center;
    }
  }
</style>