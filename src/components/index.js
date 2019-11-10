/* 样式初始化和通用样式 start */
import 'styles/normalize.scss'
import 'styles/common.scss'
/* 样式初始化和通用样式 end */

/* element组件 start */
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
  Tooltip
} from 'element-ui'

import { Message } from 'element-ui'

let components = [
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
  Tooltip
]
/* element组件 end */

/* 自定义组件 start */
import 'styles/components/index.scss' // 自定义组件的样式
import VTable from './Table' // 表格组件
import VIcon from './Icon'    // 图标
import VButton from './Button' // 按钮
import ConfirmPopover from './ConfirmPopover' // 确认气泡
import Page from './Page' // 页面
import VDialog from './Dialog' // 弹框
export { default as ColorPicker } from './ColorPicker' // 拾色器
export { default as Language } from './Language' // 国际化
let customComponents = [VTable, VIcon, VButton, ConfirmPopover, Page, VDialog]
/* 自定义组件 end */

export default function (Vue) {
  Vue.prototype.$ELEMENT = { size: 'mini' }
  components.forEach(component => Vue.component(component.name, component))
  Vue.prototype.$msg = Message

  customComponents.forEach(component => {
    Vue.component(component.name, component)
  })

  components = null
  customComponents = null
}
