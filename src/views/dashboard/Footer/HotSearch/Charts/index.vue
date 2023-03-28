<template>
  <div>
    <div class="title">
      <slot name="title" />
    </div>
    <div class="number">
      <slot name="number" />
    </div>
    <div ref="line" class="line" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    const myChart = echarts.init(this.$refs.line)
    const option = {
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          data: [
            820, 290, 932, 801, 490, 934, 1290, 800, 600, 300, 700, 1330, 1220
          ],
          type: 'line',
          smooth: true,
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'skyblue'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'skyblue'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ],
              global: false
            }
          }
        }
      ],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    }
    myChart.setOption(option)
  }
}
</script>

<style scoped>
.title h3 {
  font-weight: 400;
  font-size: 16px;
  color: #ccc;
}
.title h3 i {
  margin-left: 5px;
}
.number span:first-child {
  font-size: 26px;
  margin-right: 20px;
}
.number span:nth-child(2) {
  font-size: 14px;
  color: #888;
}
.line {
  width: 100%;
  height: 60px;
}
</style>
