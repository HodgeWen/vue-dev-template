import { getType, each, isEmpty, getKeyNumbers } from './helper'

function findIndex(arr, cb) {
  let i = 0
  while (i < arr.length) {
    if (cb(arr[i], i)) return i
    i++
  }
  return -1
}
export default class Model {
  data = []

  constructor (mixinData) {
    this.mixinData = mixinData
  }

  insert(document) {
    const type = getType(document)
    const { data } = this
    if (type === 'Object') {
      data.push({...this.mixinData, ...document})
      return
    }
    if (type === 'Array') {
      document.forEach(item => {
        this.insert(item)
      })
      return
    }
  }

  remove(query) {
    const type = getType(query)
    const { data } = this
    if (type === 'Number') {
      if (query >= 0 && data[query]) {
        data.splice(query, 1)
        return true
      }
      return false
    }
    if (type === 'Object') {
      if (isEmpty(query)) {
        return false
      }
      if (getKeyNumbers(query) === 1) {
        const key = Object.keys(query)[0]
        const val = query[key]
        const index = findIndex(data, item => item[key] === val)
        return index !== -1 ? this.remove(index) : false
      }

      const index = findIndex(data, item => {
        let ret = true
        each(query, (val, key) => {
          item[key] !== val && (ret = false)
        })
        return ret
      })

      return index !== -1 ? this.remove(index) : false
    }
    
  }

  update(index, document) {
    if (this.data[index]) {
      this.data[index] = document
    }
  }
}