<template>
  <el-dialog
    :visible="visible"
    :width="typeof width === 'number' ? width + 'px' : width"
    class="v-dialog"
    v-bind="$attrs"
    @opened="onOpened"
    @close="onClose"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
  >
    <slot />
    <div v-if="!view" slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="onConfirm">确定</el-button>
    </div>
  </el-dialog>
  <!-- <transition name="bounce" mode="out-in">
    <div class="v-dialog" ref="dialog" v-show="visible">
      <div class="v-dialog__header">
        {{title}}
      </div>
      <div class="v-dialog__body"></div>
      <div class="v-dialog__footer">

      </div>
    </div>
  </transition> --> 
</template>

<script>
export default {
  name: 'VDialog',

  inheritAttrs: false,

  props: {
    visible: {
      type: Boolean
    },

    width: {
      type: String | Number,
      default: '600px'
    },

    view: Boolean,

    cancelText: {
      type: String,
      default: 'cancel'
    },

    confirmText: {
      type: String,
      default: 'confirm'
    },

    confirmMethod: {
      type: Function
    },

    appendToBody: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  data: vm => ({
    loading: false
  }),

  methods: {
    onCancel() {
      this.$emit('change', false)
    },

    async onConfirm() {
      if (this.confirmMethod) {
        this.loading = true
        const ret = await this.confirmMethod()
        this.loading = false
        if (ret === false) return
      }
      this.$emit('change', false)
    },

    onClose() {
      this.$emit('change', false)
    },

    onOpened() {
      this.$emit('opened')
    }
  },

  model: {
    prop: 'visible',
    event: 'change'
  }
}
</script>
