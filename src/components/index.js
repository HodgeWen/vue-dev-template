// 为element按需引入的组件
import {
  Button,
  Table,
  TableColumn,
  Input,
  Form,
  Select,
  Option,
  Upload,
  pagination,
  Menu,
  MenuItem,
  DatePicker
} from 'element-ui'

// 自定义组件
import VTable from './Table'
import VInput from './DoubleInput'
import VSelect from './DoubleSelect'

const components = [
  Button,
  Table,
  TableColumn,
  Input,
  Form,
  Select,
  Option,
  Upload,
  pagination,
  Menu,
  MenuItem,
  DatePicker
]

const customComponents = [VTable, VInput, VSelect]

export default function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  customComponents.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 按需导出的组件
export { default as VChart } from './Chart'
