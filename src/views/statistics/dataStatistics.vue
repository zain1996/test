<template>
    <div>
        <div class="headerBox" id="one">
            <div class="countTo-list" >
                <v-countTo :startVal="0" :endVal.sync="numbers.countNum" :duration="1000" class="countNum">
                    <div slot='icon'><i class="fas fa-users font-size"></i></div>
                    <p slot="desc" class="desc">总人数</p>
                </v-countTo>
                <v-countTo :startVal="0" :endVal.sync="numbers.currentNum" :duration="1000" class="currentNum item-margin">
                    <div slot='icon'><i class="fas fa-users font-size"></i></div>
                    <p slot="desc" class="desc">当前在线人数</p>
                </v-countTo>
            </div>
        </div>
        <div  id="two">
            <div class="line">
                <h3 class="line-title">登陆用户数（2018-7-14日至2018-7-20）</h3>
                <ve-line :legend-visible="false" :data="chartData" height="330px" :grid="options.grid"></ve-line>
            </div>
        </div>
    </div>
</template>

<script>
    import countTo from '@/views/statistics/components/countTo'
    import Vue from 'vue'
    import VeLine from 'v-charts/lib/line'
    Vue.component(VeLine.name, VeLine)
    export default {
        name: 'dataStatistics',
        components: {
            'v-countTo': countTo
        },
        data(){
            return {
              // 数量统计
              numbers: {
                countNum: 856421,
                currentNum: 51427
              },
              // 图表配置
              options:{
                grid:{
                  top:20,
                  left:20
                }
              },
              // 图表
              chartData: {
                columns: ['areaId', '登陆用户数'],
                rows: [
                  { 'areaId': '周一', '登陆用户数': 1393},
                  { 'areaId': '周二', '登陆用户数': 3530},
                  { 'areaId': '周三', '登陆用户数': 3530},
                  { 'areaId': '周四', '登陆用户数': 4000},
                  { 'areaId': '周五', '登陆用户数': 4500},
                  { 'areaId': '周六', '登陆用户数': 2001},
                  { 'areaId': '周日', '登陆用户数': 3210},
                ]
              },
            }
        },
        methods:{

        },
        created(){

        }
    }
</script>

<style lang="scss" scoped>
    .countTo-list {
        display: flex;
        justify-content: space-around;
        .countTo {
            flex: 1;
        }
        .countNum{
            background-color: #EA5D66;
            .font-size{ font-size: 40px;opacity: 0.7;color: #FFFFFF;}
        }
        .currentNum{
            background-color: #53D191;
            .font-size{ font-size: 46px;opacity: 0.7;color: #FFFFFF;}
        }
    }
    .item-margin{
        margin-left: 10px;
    }
    #two{
      .line-title{
        margin-left: 10px;
      }
    }
    //上左一
    .line{
        box-sizing:border-box;
        background:#ffffff;
        width: 100%;
        height: 400px;
        margin-top: 15px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
        border-radius: 6px;
        padding: 20px 0px;
        display: inline-block;
        overflow: hidden;
    }
</style>