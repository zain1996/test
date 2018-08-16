<template>
  <el-row class="warp">
    <el-col :span="24">
      <div class="order-top">
        <span>订单编号：12312312312212</span>
        <span>订单状态：已完成</span>
      </div>
      <div class="order-content">
        <table  cellspacing="0">
          <tr>
            <th>
              <div class="label">下单时间</div>
            </th>
            <td>
              <div class="info">
                2018-05-28 13:54:04
              </div>
            </td>
            <th>
              <div class="label">支付时间</div>
            </th>
            <td>
              <div class="info">2018-05-28 13:54:04</div>
            </td>
          </tr>
          <tr>
            <th>
              <div class="label">姓名</div>
            </th>
            <td>
              <div class="info">张三</div>
            </td>
            <th>
              <div class="label">联系方式</div>
            </th>
            <td>
              <div class="info">18780170579</div>
            </td>
          </tr>
          <tr>
            <th>
              <div class="label">课程名称</div>
            </th>
            <td>
              <div class="info">车辆主要安全装置</div>
            </td>
            <th>
              <div class="label">课程来源</div>
            </th>
            <td>
              <div class="info">深港学院</div>
            </td>
          </tr>
          <tr>
            <th>
              <div class="label">订单金额</div>
            </th>
            <td>
              <div class="info">199.00</div>
            </td>
            <th>
              <div class="label">支付金额</div>
            </th>
            <td>
              <div class="info">199.00</div>
            </td>
          </tr>
          <tr>
            <th>
              <div class="label">支付方式</div>
            </th>
            <td>
              <div class="info">支付宝</div>
            </td>
            <th>
              <div class="label">支付状态</div>
            </th>
            <td>
              <div class="info">已支付</div>
            </td>
          </tr>
          <tr>
            <th>
              <div class="label">交易流水号</div>
            </th>
            <td>
              <div class="info">2018051214128965434546</div>
            </td>
            <th>
              <div class="label">课程评价</div>
            </th>
            <td>
              <div class="info">内容不错</div>
            </td>
          </tr>
          <tr>
            <th>
              <div class="label">课程综合评分</div>
            </th>
            <td>
              <div class="info">4.5星</div>
            </td>
            <th>
              <div class="label">备注</div>
            </th>
            <td>
              <div class="info"></div>
            </td>
          </tr>
        </table>
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

  .order-top{
    padding: 20px;
    border:1px solid rgba(191, 205, 218, 1);
    :nth-child(1){
      margin-right: 50px;
    }
  }
  .order-content{
    margin-top: 10px;
    table{
      width: 100%;
      border-collapse: collapse;
      text-align: center;
      td,th{
        border: solid rgba(191, 205, 218, 1);
        border-width: 0 1px 1px 0;
      }
      tr{
        border: solid rgba(191, 205, 218, 1);
        border-width: 1px 0 0 1px;
      }
      th{
        width: 200px;
        background: #ecf2f7;
      }
      .label{
        font-weight: normal;
        width: 200px;
      }
    }
  }
</style>