<template>
  <ul class="v-expand clear">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'VExpand',

  props: {
    labelWidth: {
      type: [Number, String],
      default: '80px'
    },

    grid: {
      type: Number,
      validator(val) {
        return val >= 1 && val <= 10
      },
      default: 2
    },

    size: String
  },

  computed: {
    itemSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },

  provide() {
    let { labelWidth, grid, itemSize } = this

    if (typeof labelWidth === 'number') {
      labelWidth += 'px'
    }
    
    return {
      labelWidth, grid, itemSize
    }
  }
}
</script>
