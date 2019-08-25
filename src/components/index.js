// iview 按需引入的组件
// import {
//   Button, Table, Input, Form,
//   Select, Option, Upload
// } from 'iview'

// const components = {
//   'i-button': Button, 'i-table': Table, 'i-input': Input, 'i-form': Form,
//   'i-select': Select, 'i-option': Option, Upload
// }

// 自定义组件
import VTable from './Table'

const customComponents = [
  VTable
]

export default function (Vue) {
  // for (const key in components) {
  //   Vue.component(key, components[key])
  // }

  customComponents.forEach(component => {
    Vue.component(component.name, component)
  })
}