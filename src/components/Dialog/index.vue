<template>
  <el-dialog
    class="v-dialog"
    v-bind="$attrs"
    :visible="visible"
    @close="onCancel"
    v-on="$listeners"
    :width="typeof width === 'number' ? width + 'px' : width"
  >
    <slot />
    <div v-if="!view" slot="footer" class="dialog-footer">
      <el-button size="small" @click="onCancel">{{$t(cancelText)}}</el-button>
      <el-button
        size="small"
        type="primary"
        :loading="loading"
        @click="onConfirm"
      >{{$t(confirmText)}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'VDialog',

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
    }
  },

  model: {
    prop: 'visible',
    event: 'change'
  }
}
</script>

<style lang="scss">
.v-dialog {
  .el-dialog {
    border-radius: 6px;

    &__header {
      padding: 14px 16px;
      border-bottom: 1px solid #e8eaec;
    }

    &__body {
      padding: 16px;
    }
    &__footer {
      padding: 10px 16px;
      border-top: 1px solid #e8eaec;
    }
  }
}
</style>
