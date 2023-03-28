<template>
  <el-card class="box-card" style="margin: 20px 0">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="销售额" name="first" />
        <el-tab-pane label="访问量" name="second" />
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          size="mini"
          style="width: 250px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="16">
          <BarCharts :title="title" />
        </el-col>
        <el-col :span="8">
          <Trank :title="title" />
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import BarCharts from './BarCharts/index.vue'
import Trank from './Trank/index.vue'

import moment from 'moment'

export default {
  components: {
    BarCharts,
    Trank
  },
  data() {
    return {
      activeName: 'first',
      date: []
    }
  },
  computed: {
    title() {
      return this.activeName === 'first' ? '销售额' : '访问量'
    }
  },
  methods: {
    setDay() {
      const day = moment().format('YYYY MM DD')
      this.date = [day, day]
    },
    setWeek() {
      const start = moment().format('YYYY MM DD')
      const end = moment().add(7, 'days').format('YYYY MM DD')
      this.date = [start, end]
    },
    setMonth() {
      const start = moment().format('YYYY MM DD')
      const end = moment().add(1, 'months').format('YYYY MM DD')
      this.date = [start, end]
    },
    setYear() {
      const start = moment().format('YYYY MM DD')
      const end = moment().add(1, 'years').format('YYYY MM DD')
      this.date = [start, end]
    }
  }
}
</script>

<style scoped>
.clearfix {
  position: relative;
}
.right {
  position: absolute;
  right: 10px;
  top: 0;
}
.right span {
  margin-right: 25px;
  font-size: 14px;
}
</style>
