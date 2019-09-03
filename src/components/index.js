// 为element按需引入的组件
import { Button, Table, TableColumn, Input, Form, Select, Option, Upload, pagination } from 'element-ui'

// 自定义组件
import VTable from './Table'

const components = [Button, Table, TableColumn, Input, Form, Select, Option, Upload, pagination]

const customComponents = [VTable]

export default function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  customComponents.forEach(component => {
    Vue.component(component.name, component)
  })
}
