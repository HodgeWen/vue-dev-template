import Vue, { VNode } from 'vue'
import Model from './model'
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
    $merge(target: Obj, provider: Obj, keys?: string[]): void

    /**
     * 将一个对象的实例属性或方法注入到其他对象中
     * @param provider 提供者
     * @param targets 注入的目标数组
     * @param keys 指定注入的属性
     */
    $inject(provider: Obj, targets: Obj[], keys?: string[]): void

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
     * 创建一个操作按钮
     * @param options 配置项
     */
    $createOpration(options: OprationOptions): VNode

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
  }
}
