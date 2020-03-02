// 插件本质上是挂载到vue原型上的方法, 我们可以在全局中使用this访问
import { each, isEmpty, getType } from './helper'
import Model from './model'

export default function(Vue) {
  const pt = Vue.prototype

  // 数据合并
  pt.$merge = function(target, provider, keys) {
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
  pt.$mergeSync = function(target, provider, keys) {
    if (!provider) return
    if (keys instanceof Array) {
      keys.forEach(key => {
        const val = provider[key]
        val !== undefined && (target[key] = val)
      })
      return target
    }
    each(target, (_, key) => {
      const val = provider[key]
      if (val !== undefined) target[key] = val
    })
    return target
  }

  // 数据注入
  pt.$inject = function(provider, targets, keys) {
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
  pt.$injectSync = function(provider, targets, keys) {
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
  }

  // 是否为空值
  pt.$isEmpty = isEmpty

  // 值状态
  pt.$getType = getType

  // 表单验证
  pt.$validate = function(ref, field) {
    const refer = this.$refs[ref]
    if (!refer) {
      return true
    }
    if (field !== undefined) {
      return new Promise((resolve, reject) => {
        refer.validateField(field, (errMsg) => {
          resolve(errMsg ? false : true)
        })
      })   
    }
    return refer.validate().catch(err => err)
  }

  pt.$resetFields = function(ref) {
    const refer = this.$refs[ref]
    if (!refer) return
    refer.resetFields()
  }

  pt.$clearValidate = function(ref, props) {
    const refer = this.$refs[ref]
    if (!refer) return
    ref.clearValidate(props)
  }

  pt.$initData = function(data, configs) {
    let map = {
      Number: 0,
      String: '',
      Array: [],
      Object: {},
      ...configs
    }

    each(data, (val, key, ctx) => {
      ctx[key] = map[getType(val)]
    })
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
      'v-confirm-popover',
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

  // 调试函数
  pt.$log = function(...args) {
    console.log(...args)
  }

  // 调试函数
  pt.$dir = function(...args) {
    console.dir(...args)
  }

  // 输入框正整数
  pt.$toInt = function(val) {
    if (/[0-9]/.test(val.slice(-1))) {
      return val
    }
    return val.slice(0, -1)
  },

  // 创建一个验证器
  pt.$makeAsyncValidator = function(validate, msg = '已存在') {
    let vm = this
    return async function (_, uniqueValue, cb) {
      // 空值直接通过
      if (!uniqueValue) return cb()
      let { type, payload } = vm.dialog
      let { id } = payload.row || payload
      let res = await validate(type === 'increase' ? { uniqueValue } : { id, uniqueValue })
      if (res.code !== 200) return cb('验证失败, 请检查服务器设置')
      res.content ? cb(msg) : cb()
    }
  }

  // 创建数据模型
  pt.$createDataModel = function(mixinData) {
    return new Model(mixinData)
  }

  // 组合
  pt.$pipe = async function(...args) {
    let i = 0
    let len = args.length
    let pre = null
    while (i < len) {
      if (pre === false) return

      let arg = args[i]
      if (arg instanceof Array) {
        pre = await arg[0].call(this, ...arg.slice(1))
        if (pre === false) {
          return
        } else {
          if (this.$getType(pre) === 'Object' && pre.code !== 200) {
            return
          }
        }
      } else if (arg instanceof Function) {
        pre = await arg(pre)
      }

      i++
    }
  }
}
