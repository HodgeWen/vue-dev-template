<template>
  <el-input
    class="v-input"
    ref="input"
    @input="onInput"
    v-bind="$attrs"
    :class="_inputClass"
    :type="type"
    :clearable="clearable"
    :maxlength="_maxlength"
    :show-word-limit="showWordLimit" 
    :placeholder="_placeholder"
    :style="{ width: _width }"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="type === 'text'" #suffix>
      <slot name="suffix" />
    </template>
    <template #prepend>
      <slot name="prepend" />
    </template>
    <template #append>
      <slot name="append" />
    </template>
  </el-input>
</template>

<script>
import { sizeMap } from 'mixins/sizeMap'
export default {
  name: 'VInput',

  mixins: [sizeMap],

  inheritAttrs: false,

  props: {
    placeholder: String,

    type: {
      type: String,
      default: 'text'
    },

    width: String,

    formatter: {
      type: Function
    },

    maxlength: String,

    showWordLimit: {
      type: Boolean,
      default: true
    },

    clearable: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    _placeholder() {
      return this.placeholder || (this.type === 'number' ? '请输入数字' : '请输入')
    },

    // 默认是100%
    _width() {
      return this.width || (this.$parent.$options.name === 'ElFormItem' ? '' : this.pxWidth)
    },

    _inputClass() {
      return this.type === 'number' ? 'v-input--number' : ''
    },

    _maxlength() {
      if (this.type === 'number') return null
      return this.maxlength ? this.maxlength : this.type === 'text' ? '20' : '100'
    },

    focus() {
      return this.$refs.input.focus
    }
  },

  methods: {
    onInput(val) {
      if (this.formatter) {
        return this.$emit('input', this.formatter(val))
      }
      this.$emit('input', val)
    }
  }
}
</script>
