<template>
  <div ref="bar" class="bar" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: ['title'],
  data() {
    return {
      myChart: null,
      option: {}
    }
  },
  watch: {
    title() {
      this.myChart.setOption({
        title: {
          text: this.title
        }
      })
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.bar)

    this.option = {
      title: {
        text: this.title + '趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220, 200, 123, 145, 56, 48]
        }
      ]
    }

    this.myChart.setOption(this.option)
  }
}
</script>

<style scoped>
.bar {
  width: 100%;
  height: 350px;
}
</style>
