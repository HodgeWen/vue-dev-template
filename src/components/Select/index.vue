<template>
  <el-select 
    v-bind="$attrs"
    @clear="$emit('clear', $event)"
    @change="onChange"
    @remove-tag="$emit('remove-tag', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    :clearable="clearable"
    :value="value"
    :style="{ width: _width }"
  >
    <template v-if="optionsType === 'Array'">
      <template v-if="!renderItem">
        <el-option @click.native="$emit('select', option)" v-for="(option, index) of options" :key="index" :label="option[labelKey]" :value="option[valueKey]" /> 
      </template>
      <template v-else>
        <el-option @click.native="$emit('select', option)" v-for="(option, index) of options" :key="index" :label="option[labelKey]" :value="option[valueKey]">
          <RenderItem :render="renderItem" :ctx="{ option, index }" />
        </el-option>
      </template>
    </template>

    <template v-else-if="optionsType === 'Object'">
      <template v-if="!renderItem">
        <el-option v-for="(val, key) in options" :key="key" :label="val" :value="key" /> 
      </template>
      <template v-else>
        <el-option v-for="(val, key) in options" :key="key" :label="val" :value="key">
          <RenderItem :render="renderItem" :ctx="{ val, key }" />
        </el-option>
      </template>
    </template>
  </el-select>
</template>

<script>
import { getType } from 'utils/helper'
import { sizeMap } from 'mixins/sizeMap'
import { httpDefault } from 'apis/axios'
export default {
  name: 'VSelect',

  mixins: [sizeMap],

  inheritAttrs: false,

  components: {
    RenderItem: {
      functional: true,

      props: {
        render: {
          type: Function
        },

        ctx: Object
      },

      render(h, { props }) {
        return props.render(h, props.ctx)
      }
    }
  },

  props: {
    value: {
      type: [String, Array, Number, Object]
    },

    options: {
      type: [Array, Object]
    },

    valueKey: {
      type: String,
      default: 'value'
    },

    labelKey: {
      type: String,
      default: 'label'
    },

    renderItem: {
      type: Function
    },

    clearable: {
      type: Boolean,
      default: true
    },

    width: String
  },

  data: () => ({
    originValue: null // 如果是null那么清空选框后应仍为null
  }),

  computed: {
    optionsType() {
      return getType(this.options)
    },

    _width() {
      return this.width || (this.$parent.$options.name === 'ElFormItem' ? '100%' : this.pxWidth)
    }
  },

  methods: {
    onChange(v) {
      if (v) {
        this.$emit('change', v)
      } else {
        this.$emit('change', this.$attrs.multiple || this.originValue ? v : this.originValue)
      }
    }
  },

  model: {
    event: 'change',
    prop: 'value'
  },

  mounted() {
    if (!this.$attrs.multiple) {
      this.originValue = this.value
    }
  }
}
</script>
