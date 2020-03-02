declare const dialog: {
  data(): { 
    dialog: {
      visible: false,
      type: string,
      title: string,
      payload: Record<string, any>
    }
  };

  methods: {
    /**
     * 打开弹框
     * @param type 弹框类型
     * @param title 弹框标题
     * @param payload 数据
     * @param callback 打开弹框时的回调 
     */
    _openDialog(type: string, title: string, payload?: any, callback?: () => void): void;

    /**
     * 表单提交方法, 此方法会和type一一对应
     * @param formName 表单引用名
     */
    _onConfirm(formName: string): Promise<any>

    /**
     * 重置表单的字段
     * @param visible 弹框状态 true显示 false隐藏
     * @param formName 表单引用名 
     */
    _onDialogChange(visible: boolean, formName: string): void;
  };
}

export default dialog
