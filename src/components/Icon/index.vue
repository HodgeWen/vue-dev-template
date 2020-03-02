<template>
  <i
    @click="$emit('click')"
    :class="lib === 'iconfont' ? 'iconfont icon-' + type : 'el-icon-' + type"
    :style="{ fontSize: size, color, cursor: pointer ? 'pointer' : '' }"
  ></i>
</template>

<script>
export default {
  name: 'VIcon',

  props: {
    type: String,

    size: String,

    pointer: Boolean,

    color: String,

    lib: {
      type: String,
      default: 'iconfont'
    }
  }
}
</script>
