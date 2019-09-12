<template>
  <main>
    <v-chart ref="chart" style="height: 100%" :option="option" />
  </main>
</template>

<script>
import { VChart } from 'components'

export default {
  components: { VChart },

  data: vm => ({
    option: {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: []
        }
      ]
    }
  }),

  methods: {
    setData() {
      this.option = {
        series: [
          {
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
    }
  },

  mounted() {
    this.setData()
    this.$refs.chart.chart.on('click', {
      seriesIndex: 0
    }, (e) => {
      window.alert(e.data)
    })
  },

  beforeDestroy () {
    this.$refs.chart.chart.off('click')
  }
}
</script>

<style>
</style>