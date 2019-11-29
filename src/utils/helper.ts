type O = Record<string, any>

let toString = Object.prototype.toString

/**
 * 遍历对象
 * @param target 目标对象
 * @param callback 回调函数
 */
export function each(target: O, callback: (val: any, key: string, origin: O) => void): void;
/**
 * 遍历数组
 * @param target 目标数组
 * @param callback 回调函数
 */
export function each(target: any[], callback: (val: any, index: number, array: any[]) => void): void;
export function each(target: any, callback: any) {
  if (target instanceof Array) {
    return target.forEach(callback)
  }

  if (typeof target === 'object') {
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        callback(target[key], key, target)
      }
    }
  }
}

/**
 * 获取值的类型
 * @param value 任意值
 */
export function getType(value: any): string {
  return toString.call(value).slice(8, -1)
}

/**
 * 获取对象的自身属性数量
 * @param obj 对象
 */
export function getKeyNumbers(obj: { [key: string]: any }) {
  let n = 0
  each(obj, () => n++)
  return n
}

/**
 * 判断任意值是否是空值
 * @param value 任意值
 */
export function isEmpty(value: any): boolean {
  let type = getType(value)

  let map: Record<string, () => boolean> = {
    Number() {
      return value === 0
    } ,
    String() {
      return value === ''
    },
    Object() {
      return getKeyNumbers(value) === 0
    },
    Array() {
      return value.length === 0
    }
  }

  if(type in map) {
    return map[type]()
  }

  return false
}
