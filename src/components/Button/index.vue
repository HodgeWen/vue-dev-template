<template>
  <el-button @click="onClick" :loading="loading" v-bind="$attrs">
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'VButton',

  inheritAttrs: false,

  props: {
    callback: {
      type: Function
    }
  },

  data: vm => ({
    loading: false
  }),

  methods: {
    async onClick() {
      if (!this.callback) return
      this.loading = true
      await this.callback()
      this.loading = false
    }
  }
}
</script>

<style>
</style>