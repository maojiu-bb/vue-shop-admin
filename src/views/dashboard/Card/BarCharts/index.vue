<template>
  <div ref="barCharts" class="barCharts" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    const myChart = echarts.init(this.$refs.barCharts)
    const option = {
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 90, 115, 130],
          type: 'bar'
        }
      ],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      tooltip: {}
    }
    myChart.setOption(option)
  }
}
</script>

<style scoped>
.barCharts {
  width: 100%;
  height: 80%;
}
</style>
