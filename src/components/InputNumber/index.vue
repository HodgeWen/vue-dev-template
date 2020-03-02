<template>
  <el-input-number class="v-input-number" :style="{ width: width || inputWidth }" v-bind="$attrs" :placeholder="placeholder" :controls-position="controlsPosition" v-on="$listeners" />
</template>

<script>
export default {
  name: 'VInputNumber',

  inheritAttrs: false,

  props: {
    controlsPosition: {
      type: String,
      default: 'right'
    },

    width: String,

    placeholder: {
      type: String,
      default: '请输入数值'
    }
  },

  computed: {
    inputWidth() {
      return this.$parent.$options.name === 'ElFormItem' ? '100%' : '120px'
    }
  }
}
</script>
