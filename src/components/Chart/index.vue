<template>
  <div class="v-chart" ref="chart"></div>
</template>

<script>
import echarts from 'echarts'
import './index.scss'
export default {
  name: 'VChart',

  props: {
    option: {
      type: Object
    }
  },

  data: vm => ({
    chart: null
  }),

  methods: {
    init () {
      this.chart = echarts.init(this.$refs.chart)
      this.setOption()
    },

    setOption () {
      this.option && this.chart.setOption(this.option)
    }
  },

  watch: {
    option (val) {
      this.chart && this.setOption()
    }
  },

  mounted() {
    this.init()
  }
}
</script>