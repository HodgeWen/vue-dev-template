import Vue, { VueConstructor, VNode } from 'vue'
import { each, isEmpty, getType } from './helper'
type O = Record<string, any>
type Type = 'primary' | 'danger' | 'warning' | 'success' | 'info'
type Size = 'medium' | 'small' | 'mini'

interface Options {
  type: Type;
 
  size: Size;
  
  round?: boolean;

  text?: string;

  icon?: string;

  style?: string;
}

interface OprationOptions extends Options {
  onClick?: () => void;
}

interface ConfirmPopOptions extends Options {
  tips?: string

  title?: string

  onConfirm?: () => void
}

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 异步合并数据
     * @param target 目标对象
     * @param provider 提供者对象
     * @param keys 指定字段
     */
    $merge(target: O, provider: O, keys?: string[]): Promise<any>;

    /**
     * 同步合并数据
     * @param target 目标对象
     * @param provider 提供者对象
     * @param keys 指定字段
     */
    $mergeSync(target: O, provider: O, keys?: string[]): void;
    
    /**
     * 异步数据注入
     * @param provider 提供者
     * @param targets 目标对象
     * @param keys 指定字段
     */
    $inject(provider: O, targets: O[], keys?: string[]): Promise<any>;

    /**
     * 同步数据注入
     * @param provider 提供者
     * @param targets 目标对象
     * @param keys 指定字段
     */
    $injectSync(provider: O, targets: O[], keys?: string[]): void;

    /**
     * 是否是空值
     * @param value 任意值
     */
    $isEmpty(value: any): boolean;
    
    /**
     * 获取任意值的类型
     * @param value 任意值
     */
    $getType(value: any): string;

    /**
     * 验证表单的字段
     * @param refName 引用名
     * @param field 字段
     */
    $validate(refName: string, field?: string): Promise<boolean> | boolean;
    
    /**
     * 清空字段值和验证
     * @param refName 引用名
     */
    $resetFields(refName: string): void;

    /**
     * 清除验证
     * @param refName 引用名
     * @param props 验证的字段
     */
    $clearValidate(refName: string, props: string[] | string): void;

    $createOpration(options: OprationOptions): VNode;

    $createConfirmPop(options: ConfirmPopOptions): VNode;
    
    /**
     * 调试
     * @param args 参数
     */
    $log(...args: any[]): void;
    
    /**
     * 调试
     * @param args 参数列表
     */
    $dir(...args: any[]): void;
  }
}

export default function (Vue: VueConstructor) {
  let pt = Vue.prototype

  // 数据合并
  pt.$merge = function(target: O, provider: O, keys: string []) {
    return new Promise((resolve, reject) => {
      if (!provider) return reject('$merge方法的第二个参数不能为空')

      this.$nextTick(() => {
        if (keys instanceof Array) {
          return keys.forEach(key => {
            const val = provider[key]
            val !== undefined && (target[key] = val)
          })
        }
        
        each(target, (_, key) => {
          const val = provider[key]
          if (val !== undefined) target[key] = val
        })

        resolve(target)
      })
    })
  }

  // 数据同步合并
  pt.$mergeSync = function(target: O, provider: O, keys: string[]) {
    if (!provider) return
    if (keys instanceof Array) {
      return keys.forEach(key => {
        const val = provider[key]
        val !== undefined && (target[key] = val)
      })
    }
    each(target, (_, key) => {
      const val = provider[key]
      if (val !== undefined) target[key] = val
    })
  }

  // 数据注入
  pt.$inject = function(provider: O, targets: O[], keys: string[]) {
    return new Promise((resolve, reject) => {
      if (!targets) return reject('$inject方法的第二个参数不能为空')
      this.$nextTick(() => {
        if (keys instanceof Array) {
          return targets.forEach(target => {
            keys.forEach(key => {
              const val = provider[key]
              if (val !== undefined) target[key] = val
            })
          })
        }
        targets.forEach(target => {
          each(target, (_, key) => {
            const val = provider[key]
            if (val !== undefined) target[key] = val
          })
        })

        resolve(true)
      })
    })
  }

  // 数据同步注入
  pt.$injectSync = function(provider: O, targets: O[], keys: string[]) {
    if (keys instanceof Array) {
      return targets.forEach(target => {
        keys.forEach(key => {
          let val = provider[key]
          if (val !== undefined) target[key] = val
        })
      })
    }
    targets.forEach(target => {
      each(target, (_, key) => {
        let val = provider[key]
        if (val !== undefined) target[key] = val
      })
    })
  }

  // 是否为空值
  pt.$isEmpty = isEmpty

  // 值状态
  pt.$getType = getType

  // 表单验证
  pt.$validate = function(refName: string, field?: string) {
    let refer = this.$refs[refName]
    if (!refer) {
      return false
    }
    if (field !== undefined) {
      return new Promise((resolve, reject) => {
        refer.validateField(field, (errMsg?: string) => {
          resolve(errMsg ? false : true)
        })
      })   
    }
    return refer.validate().catch((err: boolean) => err)
  }

  pt.$resetFields = function(refName: string) {
    const refer = this.$refs[refName]
    if (!refer) return
    refer.resetFields()
  }

  pt.$clearValidate = function(refName: string, props: string) {
    const refer = this.$refs[refName]
    if (!refer) return
    refer.clearValidate(props)
  }

  // 创建操作按钮
  pt.$createOperation = function(options: OprationOptions) {
    const {
      type = 'primary',
      size = 'mini',
      round = true,
      onClick = () => {},
      text = null,
      style = null,
      icon = null
    } = options
    return this.$createElement(
      'el-button',
      {
        props: {
          type,
          size,
          round,
          icon
        },
        style,
        on: {
          click: onClick
        }
      },
      text
    )
  }

  // 创建带确认pop的按钮
  pt.$createConfirmPop = function(options: ConfirmPopOptions) {
    const {
      tips = null,
      title = null,
      type = 'danger',
      size = 'mini',
      round = true,
      text = null,
      icon = null,
      style = null,
      onConfirm = () => {}
    } = options

    return this.$createElement(
      'v-confirm-popover',
      {
        props: {
          tips
        },
        attrs: {
          title
        },
        style,
        on: {
          confirm: onConfirm
        }
      },
      [
        this.$createElement(
          'el-button',
          {
            props: {
              type,
              size,
              round,
              icon
            }
          },
          text
        )
      ]
    )
  }

  pt.$log = function (...args: any[]) {
    console.log(...args)
  }

  pt.$dir = function (...args: any[]) {
    console.dir(...args)
  }


  // 创建数据模型
  // pt.$createDataModel = function(mixinData: O) {
  //   return new Model(mixinData)
  // }
}