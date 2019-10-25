const toString = Object.prototype.toString
import { Message } from 'element-ui'

// 遍历对象或者数组
export function each(target, callback) {
  if (Array.isArray(target)) {
    return target.forEach(callback)
  }

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      callback(target[key], key, target)
    }
  }
}

// 获取值的类型
export function getType(value) {
  return toString.call(value).slice(8, -1)
}

// 获取对象属性数量
export function getKeyNumbers(obj) {
  let n = 0
  each(obj, () => n++)
  return n
}

// 判断是否是空值
export function isEmpty(value) {
  const type = getType(value)

  return {
    Number: () => value === 0,
    String: () => value === '',
    Object: () => getKeyNumbers(value) === 0,
    Array: () => value.length === 0
  }[type]()
}

// 捕获api的错误
export function catchErr(res) {
  return function (success, failed) {
    if (res.code === 'success') {
      success(res, function () {
        Message.success(res.msg)
      })
    } else {
      failed(res, function () {
        Message.error(res.msg)
      })
    }
  }
}