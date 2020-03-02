export default {
  data: () => ({
    dialog: {
      title: '',
      type: '',
      visible: false,
      payload: {}
    }
  }),

  methods: {
    _openDialog(type, title, payload, callback) {
      const { dialog } = this
      dialog.visible = true
      dialog.type = type
      dialog.title = title
      if (payload) {
        dialog.payload = payload
      }
      callback && callback.call(this)
    },

    // 表单提交
    _onConfirm(formName) {
      return formName ? () => this.__submit(formName) : this.__submit('form')
    },

    // 提交
    async __submit(formName) {
      const valid = await this.$validate(formName)
      if (valid === false) return false

      let { type } = this.dialog
      if (this[type]) {
        await this[type]()
      } else {
        console.warn(`${type}方法不存在, 请检查接口名称`)
      }
    },

    // 置空表单
    _onDialogChange(visible, formName = 'form') {
      if (!visible) {
        this.$refs[formName] && this.$resetFields(formName)
        this.dialog.payload = {}
      }
    }
  }
}