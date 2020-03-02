<template>
  <span>{{prefix + computedValue}}</span>
</template>

<script>
export default {
  name: 'VNumberFormatter',

  props: {
    // 前缀
    prefix: {
      type: String,
      default: ''
    },

    // 小数点位数
    decimals: {
      type: Number
    },

    // 目标数字
    number: {
      type: Number,
      required: true
    },

    // 动画 单位秒
    duration: {
      type: Number
    }
  },

  data: () => ({
    value: '',

    timer: null
  }),

  computed: {
    computedValue() {
      return this.getValue()
    }
  },

  methods: {
    getValue() {
      let { decimals, number } = this
      let numberStr = number.toFixed(decimals)
      let [intStr, decimalStr] = numberStr.split('.')
      
      let len = intStr.length

      if (len < 4) return numberStr
      
      let i = 0
      let str = ''
      while(i < len) {
        if (i === 0) {
          str += `${intStr.slice(0, len % 3)},`
          i += len % 3
        } else {
          str += `${intStr.slice(i, i + 3)},`
          i += 3
        }
      }
      str = str.slice(0, -1)

      return str + (decimalStr ? `.${decimalStr}` : '')
    },

    tick() {
      const { duration, number } = this

      let speed = (number - number / duration) / 10



    }
  },

  created() {
    this.getValue()
  }
}
</script>
