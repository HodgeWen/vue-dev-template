<template>
  <i
    @click="$emit('click')"
    :class="'el-icon-' + type"
    :style="{ fontSize: size, cursor: pointer ? 'pointer' : '' }"
  ></i>
</template>

<script>
export default {
  name: 'VIcon',

  props: {
    type: String,

    size: String,

    pointer: Boolean
  }
}
</script>
