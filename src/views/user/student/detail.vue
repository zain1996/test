<template>
  <el-row class="studentDetailWarp">
    <el-col :span="24">
      <div class="detail-top">
        <span>姓名：张三</span>
        <span>联系电话：13612923272</span>
        <span>所属驾校：深港驾校</span>
        <span>报名时间：2018-05-12</span>
        <span>认证状态：已认证</span>
        <span>业务类型：初领</span>
        <span>培训车型：C1</span>
      </div>
      <div class="detail-tabs">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="学习进度" name="study">
            <study/>
          </el-tab-pane>
          <el-tab-pane label="模拟考试记录" name="simulation">
            <simulation/>
          </el-tab-pane>
          <el-tab-pane label="订单记录" name="order">
            <order/>
          </el-tab-pane>
          <el-tab-pane label="登陆日志" name="log">
            <log/>
          </el-tab-pane>
          <el-tab-pane label="操作日志" name="operation">
            <operation/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import study from './components/study'
  import order from './components/order'
  import simulation from './components/simulation'
  import log from './components/log'
  import operation from './components/operation'

  export default {
    name: 'detail',
    components: {
      study: study,
      log: log,
      operation: operation,
      simulation: simulation,
      order: order
    },
    data() {
      return {
        activeName: 'study'
      }
    }
  }
</script>

<style lang="scss">
  .studentDetailWarp {
    background: #ffffff;
    overflow: hidden;
    border: 1px solid rgba(221, 221, 221, 0.5);
    border-radius: 4px;
    padding: 20px;

    .detail-top {
      padding: 10px 20px;
      border: 1px solid rgba(191, 205, 218, 1);
      span {
        display: inline-block;
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 10px 0;
      }
    }

    .detail-tabs {
      margin-top: 20px;
      .el-tabs__nav {
        border-radius: 0;
        border-bottom: 1px solid #e4e7ed;
      }
      .el-tabs .el-tabs__header {
        position: unset;
        border: 0;
      }
      .is-active {

      }
      .el-tab-pane {
        margin: 0;
        padding: 0;
        background: #ffffff;
      }
      .el-tabs__content {
        margin-top: 20px;
      }
      .table-box {
        padding: 0 !important;
        border: 0 !important;
      }
    }
  }
</style>