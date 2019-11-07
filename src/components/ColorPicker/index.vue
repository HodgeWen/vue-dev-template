<template>
  <el-popover class="v-color" placement="left" width="246" trigger="manual" v-model="visible">
    <Sketch class="v-color__picker" :value="color" @input="onColorInput"/>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="text" size="mini" @click="onConfirm">切换</el-button>
    </div>
    <section slot="reference" class="v-color__board" @click="onClick" >
      <div class="v-color__bg" :style="{ backgroundColor: color }">
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
    size: {
      type: String,
      default: 'medium'
    }
  },

  data: vm => ({
    visible: false,
    color: '#194d33'
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
