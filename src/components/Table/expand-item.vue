<template>
  <li class="v-expand-item" :class="itemClass" :style="{width: (100 / grid) + '%'}">
    <label class="v-expand-item__label" :style="{width: labelWidth}">{{label}}:</label>
    <div class="v-expand-item__content" :style="{marginLeft: labelWidth}">
      <slot />
      {{$slots.default ? null : '——'}}
    </div>
  </li>
</template>

<script>
export default {
  name: 'VExpandItem',

  props: {
    label: String,
  },

  inject: ['labelWidth', 'grid', 'itemSize'],

  computed: {
    itemClass() {
      return this.itemSize ? 'v-expand-item--' + this.itemSize : ''
    }
  },

  created() {
    if (this.$parent.$options.name !== 'VExpand') {
      throw new Error('v-expand-item组件的父组件应为v-expand')
    }
  }
}
</script>
