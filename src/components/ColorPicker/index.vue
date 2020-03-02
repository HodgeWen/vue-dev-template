<template>
  <el-popover class="v-color" placement="right" trigger="manual" popper-class="v-color__pop" v-model="visible">
    <Sketch class="v-color__picker" :value="value" @input="onColorInput"/>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="text" size="mini" @click="onConfirm">切换</el-button>
    </div>
    <section slot="reference" class="v-color__board" @click="onClick" >
      <div class="v-color__bg" :style="{ backgroundColor: value }">
        <i class="el-icon-arrow-down"></i>
      </div>
    </section>
  </el-popover>
</template>

<script>
import { Sketch } from 'vue-color'

export default {
  name: 'VColorPicker',

  components: {
    Sketch
  },

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data: vm => ({
    visible: false,
    color: ''
  }),

  methods: {
    onConfirm() {
      this.visible = false
      this.$emit('change', this.color)
    },

    onClick() {
      this.visible = true
    },

    onColorInput({ a, hex, hex8 }) {
      this.color = a === 1 ? hex : hex8
    }
  }
}
</script>
