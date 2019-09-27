<template>
  <div :style="styles" class="v-double-input" :class="classes">
    <div class="v-double-input__inner">
      <input
        @input="onInput(0, $event.target.value)"
        @focus="didFocus = true"
        @blur="didFocus = false"
        hidefocus="true"
        :value="values[0]"
        :placeholder="placeholders[0]"
        :type="type"
        v-bind="$attrs"
      />
      <i v-if="clearable && values[0]" @click="onClear(0)" class="el-icon-circle-close first"></i>
    </div>
    <span class="v-double-input__join">{{separator}}</span>
    <div class="v-double-input__inner">
      <input
        @input="onInput(1, $event.target.value)"
        @focus="didFocus = true"
        @blur="didFocus = false"
        :value="values[1]"
        :placeholder="placeholders[1]"
        :type="type"
        v-bind="$attrs"
      />
      <i v-if="clearable && values[1]" @click="onClear(1)" class="el-icon-circle-close second"></i>
    </div>
  </div>
</template>

<script>
import './index.scss'
export default {
  name: 'VDoubleInput',

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

    values: {
      type: Array,
      default: () => ['', '']
    },

    type: {
      type: String,
      default: 'text'
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
      this.didFocus && ret.push('v-double-input--focus')
      this.size && ret.push(`v-double-input--${this.size}`)
      return ret.join(' ')
    }
  },

  methods: {
    onInput(index, value) {
      const ret = [...this.values]
      ret[index] = value
      this.$emit('change', ret)
    },

    onClear(index) {
      const ret = [...this.values]
      ret[index] = ''
      this.$emit('change', ret)
    }
  },

  model: {
    event: 'change',
    prop: 'values'
  }
}
</script>
