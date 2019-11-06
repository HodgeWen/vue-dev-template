<template>
  <el-popover class="v-pop" :placement="placement" v-bind="$attrs" v-model="visible" trigger="click">
    <p class="v-pop__tips">{{tips}}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false; $emit('cancel')">取消</el-button>
      <el-button size="mini" @click="visible = false; $emit('confirm')">确定</el-button>
    </div>
    <template #reference>
      <slot />
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'ConfirmPopover',

  inheritAttrs: false,

  props: {
    tips: {
      type: String,
      default: '确认?'
    },

    placement: {
      type: String,
      default: 'bottom'
    }
  },

  data: () => ({
    visible: false
  })
}
</script>