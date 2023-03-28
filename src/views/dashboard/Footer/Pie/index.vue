<template>
  <el-card style="width: 50%">
    <div class="header">
      <span>销售额类别占比</span>
      <el-radio-group v-model="radio3" size="mini" style="margin-top: 10px">
        <el-radio-button label="全部渠道" />
        <el-radio-button label="线上" />
        <el-radio-button label="门店" />
      </el-radio-group>
    </div>
    <div ref="pie" class="pie" />
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      radio1: '全部渠道',
      radio2: '线上',
      radio3: '门店'
    }
  },
  mounted() {
    const myChart = echarts.init(this.$refs.pie)
    const option = {
      title: {
        text: '',
        subtext: '',
        left: 'center',
        top: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ]
        }
      ]
    }
    myChart.setOption(option)

    myChart.on('mouseover', (params) => {
      const { name, value } = params.data
      myChart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}
.pie {
  width: 100%;
  height: 340px;
}
</style>
