<template>
  <div id="simulationTestRulesWarp">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="科一模拟考试规则" name="1">
        <test1></test1>
      </el-tab-pane>
      <el-tab-pane label="科四模拟考试规则" name="2">
        <test2></test2>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import test1 from './components/test1'
  import test2 from './components/test2'
  export default {
    name: 'list',
    components:{
      'test1' : test1,
      'test2' : test2,
    },
    data() {
      return {
        activeName: '1'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss">
  #simulationTestRulesWarp{
    background: #ffffff;
    border-radius:4px;
    border:1px solid rgba(221, 221, 221, 0.5);
    .el-tabs__header{
      border-radius:4px;
      position: static;
      width: 100%;
    }
    .el-tabs__item{
      font-weight: normal;
    }
    .el-tabs__nav{
      padding: 10px 0;
    }
    .el-tab-pane{
      margin: 0;
      padding: 0;
    }
  }
</style>