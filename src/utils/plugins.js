// 插件本质上是挂载到vue原型上的方法, 我们可以在全局中使用this访问
import { each, isEmpty, getType } from './helper'
import Model from './model'

export default function(Vue) {
  const pt = Vue.prototype

  // 数据合并
  pt.$merge = function(target, provider, keys) {
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
    })
  }

  // 数据注入
  pt.$inject = function(provider, targets, keys) {
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
    })
  }

  // 是否为空值
  pt.$isEmpty = isEmpty

  // 值状态
  pt.$getType = getType

  // 表单验证
  pt.$validate = function(ref) {
    return this.$refs[ref].validate().catch(err => err)
  }

  // 创建操作按钮
  pt.$createOperation = function(options = {}) {
    const {
      type = 'primary',
      size = 'mini',
      round = true,
      onClick = () => {},
      text = null
    } = options
    return this.$createElement(
      'el-button',
      {
        props: {
          type,
          size,
          round,
          icon: options.icon || ''
        },
        style: options.style,
        on: {
          click: onClick
        }
      },
      text
    )
  }

  // 创建带确认pop的按钮
  pt.$createConfirmPop = function(options = {}) {
    const {
      tips = null,
      title = null,
      type = 'danger',
      size = 'mini',
      round = true,
      text = null,
      onConfirm = () => {}
    } = options

    return this.$createElement(
      'confirm-popover',
      {
        props: {
          tips
        },
        attrs: {
          title
        },
        style: options.style,
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
              icon: options.icon || ''
            }
          },
          text
        )
      ]
    )
  }

  // 创建数据模型
  pt.$createDataModel = function(mixinData) {
    return new Model(mixinData)
  }
}
