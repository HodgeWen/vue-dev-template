// 为element按需引入的组件
import {
  Button,
  Table,
  TableColumn,
  Pagination,
  Scrollbar,
  Form,
  FormItem,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Dialog,
  Select,
  Option,
  Switch,
  transfer
} from 'element-ui'

import { Message } from 'element-ui'

/* 自定义组件 start */
import VTable from './Table' // 表格组件
import VIcon from './Icon'    // 图标
import VButton from './Button' // 按钮
import ConfirmPopover from './ConfirmPopover' // 确认气泡
import Page from './Page' // 页面
import VDialog from './Dialog' // 弹框
export { default as ColorPicker } from './ColorPicker' // 拾色器
export { default as Language } from './Language' // 国际化
import 'styles/components/index.scss' // 自定义组件的样式
/* 自定义组件 end */

const components = [
  Button,
  Table,
  TableColumn,
  Pagination,
  Scrollbar,
  Form,
  FormItem,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Dialog,
  Select,
  Option,
  Switch,
  transfer
]

const customComponents = [VTable, VIcon, VButton, ConfirmPopover, Page, VDialog]

export default function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  customComponents.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$msg = Message
}
