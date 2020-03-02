import Vue, { VNode } from 'vue'
import Model from './model'
import { ElMessageComponent } from 'element-ui/types/message'
type Type = 'primary' | 'danger' | 'warning' | 'success' | 'info'
type Size = 'medium' | 'small' | 'mini'

interface Options {
  /**
   * 按钮的类型, 默认primary, 同el-button type
   */
  type: Type
  /**
   * 按钮的尺寸, 默认mini
   */
  size: Size
  /**
   * 按钮的圆角, 默认true
   */
  round?: boolean
  /**
   * 按钮的文本
   */
  text?: string
}

interface OprationOptions extends Options {
  /**
   * 按钮的点击事件
   */
  onClick?: () => void
}

interface ConfirmPopOptions extends Options {
  /**
   * 确认框的提示内容
   */
  tips?: string
  /**
   * 确认框的标题
   */
  title?: string
  /**
   * 确认框的确认事件
   */
  onConfirm?: () => void
}

type Obj = Record<string, any>

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 将provider对象合并到target当中
     * @param target 目标对象
     * @param provider 提供属性的对象
     * @param keys 指定合并的属性
     */
    $merge(target: Obj, provider: Obj, keys?: string[]): Promise<any>

    /**
     * 同步将provider对象合并到target当中
     * @param target 目标对象
     * @param provider 提供属性的对象
     * @param keys 指定合并的属性
     */
    $mergeSync(target: Obj, provider: Obj, keys?: string[]): Obj

    /**
     * 将一个对象的实例属性或方法注入到其他对象中
     * @param provider 提供者
     * @param targets 注入的目标数组
     * @param keys 指定注入的属性
     */
    $inject(provider: Obj, targets: Obj[], keys?: string[]): Promise<any>

    /**
     * 同步步将一个对象的实例属性或方法注入到其他对象中
     * @param provider 提供者
     * @param targets 注入的目标数组
     * @param keys 指定注入的属性
     */
    $injectSync(provider: Obj, targets: Obj[], keys?: string[]): void

    /**
     * 判断某个值是否为空值
     * @param value 对象 | 数组 | 字符串 | number
     */
    $isEmpty(value: Obj | any[] | string | number): boolean

    /**
     * 返回这个值的类型
     * @param value 任意值
     */
    $getType(value: any): string

    /**
     * 验证表单
     * @param refName 引用名
     */
    $validate(refName: string): Promise<boolean>
    /**
     * 验证表单
     * @param refName 引用名
     * @param field 字段
     */
    $validate(refName: string, field: string): Promise<boolean> | boolean

    /**
     * 清除表单验证并重置为初始值
     * @param refName 引用名
     */
    $resetFields(refName: string): void

    /**
     * 清除表单验证
     * @param refName 表单引用名称 
     * @param props 清除的表单字段
     */
    $clearValidate(refName: string, props: string[] | string): void

    $pipe(...args:  any[] | (() => any)[])

    /**
     * 创建一个操作按钮
     * @param options 配置项
     */
    $createOpration(options: OprationOptions): VNode

    /**
     * 初始化对象的键值
     * @param data 数据
     */
    $initData(data: Obj): void
    
    /** 控制台打印日志 */
    $log(...args: any[]): void

    /** 控制台打印对象结构 */
    $dir(...args: any[]): void
    
    /** 只允许输入正整数 */
    $toInt(val: string): string;

    /**
     * 创建一个具有确认功能的按钮, 常用于严谨操作
     * @param options 配置项
     */
    $createConfirmPop(options: ConfirmPopOptions): VNode

    /**
     * 创建一个增删改的实例, 通过实例的data属性访问列表
     * @param mixinData 
     */
    $createDataModel(mixinData: Obj): Model

    /**
     * 创建一个异步验证器
     * @param requestMethod 验证请求方法
     * @param msg 验证提示信息
     */
    $makeAsyncValidator(requestMethod: Promise<Record<string, any>>, msg?: string): Function

    /**
     * 弹框对象, 存放弹框的状态和一些临时参数,在弹框隐藏时payload会被销毁
     */
    dialog: {
      type: string;
      title: string;
      visible: Boolean;
      payload: Record<string, any>;
    };

    /**
     * 打开弹框
     * @param type 弹框类型
     * @param title 弹框标题
     */
    _openDialog(type: string, title: string): void;

    /**
     * 打开弹框
     * @param type 弹框类型
     * @param title 弹框标题
     * @param payload 弹框携带数据
     * @param callback 打开弹框时的回调 
     */
    _openDialog(type: string, title: string, payload: any, callback?: () => void): void;


    /**
     * 弹框确认
     * @param formRefName 表单引用名
     */
    _onConfirm(formRefName?: 'form' | string): Promise<any>;
    
    /**
     * 弹框发生改变
     * @param formRefName 表单引用名
     */
    _onDialogChange(visible, formRefName?: 'form' | string): void
    
    /**
     * 提示框
     */
    $msg: {
      (text: string): ElMessageComponent;
      (options: {
        message: string;
        type: 'success' | 'error' | 'warning' | 'info'
        onClose: () => void;
      }): ElMessageComponent;
      /**
       * 成功提示框
       */
      success(text: string): ElMessageComponent;
      success(options: {
        message: string;
        onClose: () => void;
      }): ElMessageComponent;

      /**
       * 警告提示框
       */
      warning(text: string): ElMessageComponent;
      warning(options: {
        message: string;
        onClose: () => void;
      }): ElMessageComponent;

      /**
       * 错误提示框
       */
      error(text: string): ElMessageComponent;
      error(options: {
        message: string;
        onClose: () => void;
      }): ElMessageComponent;

      /**
       * 信息提示框
       */
      info(text: string): ElMessageComponent;
      info(options: {
        message: string;
        onClose: () => void;
      }): ElMessageComponent;
    }

    
  }
}
