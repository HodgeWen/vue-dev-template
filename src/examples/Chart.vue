<template>
  <main>
    <v-chart style="height: 100%" :option="option" />
  </main>
</template>

<script>
import { VChart } from 'components'

export default {
  components: { VChart },

  data: vm => ({
    option: {
      title: {
        text: '极坐标双数值轴'
      },
      legend: {
        data: ['线']
      },
      polar: {
        center: ['50%', '54%']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      series: [
        {
          coordinateSystem: 'polar',
          name: '线',
          type: 'line',
          showSymbol: false,
          data: []
        }
      ],
      animationDuration: 2000
    }
  }),

  methods: {
    setData() {
      this.option = {
        series: [
          {
            data: Array(360)
              .fill()
              .map((item, index) => {
                const t = (index / 180) * Math.PI
                const r = Math.sin(2 * t) * Math.cos(2 * t)
                return [r, t]
              })
          }
        ]
      }
    }
  },

  mounted() {
    this.setData()
  }
}
</script>

<style>
</style>