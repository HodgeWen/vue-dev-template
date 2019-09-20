<template>
  <div :style="styles" class="v-double-select" :class="classes">
    <el-select
      :size="size"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange(0, $event)"
      :clearable="clearable"
      :placeholder="placeholders[0]"
      :value="values[0]"
    >
      <el-option
        v-for="(item, index) in firstOption"
        :key="index"
        :label="item[labelKey]"
        :value="item[valueKey]"
      ></el-option>
    </el-select>
    <span class="v-double-select__join">{{separator}}</span>
    <el-select
      :size="size"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange(1, $event)"
      :clearable="clearable"
      :placeholder="placeholders[1]"
      :value="values[1]"
    >
      <el-option
        v-for="(item, index) in secondOption"
        :key="index"
        :label="item[labelKey]"
        :value="item[valueKey]"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import './index.scss'
export default {
  name: 'VDoubleSelect',

  inheritAttrs: false,

  data: vm => ({
    didFocus: false
  }),

  props: {
    width: {
      type: [String, Number]
    },

    size: {
      type: String
    },

    valueKey: {
      type: String,
      default: 'value'
    },

    labelKey: {
      type: String,
      default: 'label'
    },

    firstOption: {
      type: Array,
      default: () => []
    },

    secondOption: {
      type: Array,
      default: () => []
    },

    values: {
      type: Array,
      default: () => ['', '']
    },


    placeholders: {
      type: Array,
      default: () => ['from', 'to']
    },

    separator: {
      type: String,
      default: '~'
    },

    clearable: Boolean
  },

  computed: {
    styles() {
      const ret = {}
      const { width } = this
      width && (ret.width = typeof width === 'string' ? width : width + 'px')
      return ret
    },

    classes() {
      const ret = []
      this.didFocus && ret.push('v-double-select--focus')
      this.size && ret.push(`v-double-select--${this.size}`)
      return ret.join(' ')
    }
  },

  methods: {
    onChange(index, value) {
      const ret = [...this.values]
      ret[index] = value
      this.$emit('change', ret)
    },

    onFocus() {
      this.$nextTick(() => this.didFocus = true)
    },

    onBlur () {
      this.didFocus = false
    }
  },

  model: {
    event: 'change',
    prop: 'values'
  }
}
</script>
