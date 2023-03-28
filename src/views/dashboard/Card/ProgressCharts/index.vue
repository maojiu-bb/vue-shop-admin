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
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          data: [78],
          type: 'bar',
          showBackground: true,
          barWidth: 15,
          color: 'yellowgreen',
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
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
