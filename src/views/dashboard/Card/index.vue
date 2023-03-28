<template>
  <div class="card-container">
    <div class="card-item">
      <el-card>
        <Detail number="￥ 126560" title="总销售额">
          <template slot="charts">
            <span
              >周同比 56.67% <i class="el-icon-caret-top" style="color: red"
            /></span>
            <span
              >日同比 19.16%
              <i class="el-icon-caret-bottom" style="color: yellowgreen"
            /></span>
          </template>
          <template slot="footer">
            <span>日销售额 ￥ 12423</span>
          </template>
        </Detail>
      </el-card>
    </div>
    <div class="card-item">
      <el-card>
        <Detail number="88460" title="访问量">
          <template slot="charts">
            <LineCharts />
          </template>
          <template slot="footer">
            <span>日访问量 1234</span>
          </template>
        </Detail>
      </el-card>
    </div>
    <div class="card-item">
      <el-card>
        <Detail number="88460" title="支付笔数">
          <template slot="charts">
            <BarCharts />
          </template>
          <template slot="footer">
            <span>转化率 65%</span>
          </template>
        </Detail>
      </el-card>
    </div>
    <div class="card-item">
      <el-card>
        <Detail number="78%" title="运营活动效果">
          <template slot="charts">
            <ProgressCharts />
          </template>
          <template slot="footer">
            <span
              >周同比 56.67% <i class="el-icon-caret-top" style="color: red"
            /></span>
            <span
              >日同比 19.16%
              <i class="el-icon-caret-bottom" style="color: yellowgreen"
            /></span>
          </template>
        </Detail>
      </el-card>
    </div>
  </div>
</template>

<script>
import Detail from './Detail/index.vue'
import LineCharts from './LineCharts/index.vue'
import BarCharts from './BarCharts/index.vue'
import ProgressCharts from './ProgressCharts/index.vue'

export default {
  components: {
    Detail,
    LineCharts,
    BarCharts,
    ProgressCharts
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  margin: 0;
}
.card-item {
  flex: 1;
  margin-right: 20px;
}
.card-item:last-child {
  margin-right: 0;
}
</style>
