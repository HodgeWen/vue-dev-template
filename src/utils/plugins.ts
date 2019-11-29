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
    $merge(target: O, provider: O, keys?: string[]): Promise<any>;

    $mergeSync(target: O, provider: O, keys?: string[]): void;

    $inject(provider: O, targets: O[], keys?: string[]): Promise<any>;

    $inject(provider: O, targets: O[], keys?: string[]): void;

    $isEmpty(value: any): boolean;

    $getType(value: any): string;

    $validate(refName: string, field?: string): Promise<boolean> | boolean;

    $resetFields(refName: string): void;

    $clearValidate(refName: string, props: string[] | string): void;

    $createOpration(options: OprationOptions): VNode;

    $createConfirmPop(options: ConfirmPopOptions): VNode;
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

  // 创建数据模型
  // pt.$createDataModel = function(mixinData: O) {
  //   return new Model(mixinData)
  // }
}